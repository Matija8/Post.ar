import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { skipWhile, map, take, filter } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';
import { HttpWrapperService } from '../services/mail-services/http-wrapper.service';


export abstract class Folder {
  public readonly contents: Observable<any[]>;
  public abstract refreshFolder(): void;
  public abstract emptyFolder(): void;
  public abstract waitForActivation(): Observable<boolean>;
}


interface RefreshWrapper<T> {
  data: T;
  folderInitialized: boolean;
  refreshAttempt: number;
}


export class SimpleFolder<T> extends Folder {

  protected refreshAttempt = 0;
  protected readonly stream = new BehaviorSubject<RefreshWrapper<T[]>>({
    data: [],
    folderInitialized: false,
    refreshAttempt: this.refreshAttempt,
  });
  public readonly contents: Observable<T[]> = this.stream.pipe(map(wrapper => wrapper.data));

  constructor(
    protected http: HttpWrapperService,
    protected secretar: SecretarService,
    protected readonly GET_REQUEST_URL: string,
    protected readonly EMPTY_FOLDER_ERR_CODE: number
  ) {
    super();
  }

  public refreshFolder(): void {
    this.http.get(this.GET_REQUEST_URL)
    .pipe(take(1))
    .subscribe(
      (res: any): void => {
        this.handleResponse(res);
      },
      (err: any) => {
        this.handleError(err);
      }
    );
  }

  protected handleResponse(res: any) {
    const dataJSON = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    ).data.replace('/"', '"');
    const data = JSON.parse(dataJSON).sort((a, b) => a.timestamp < b.timestamp);
    // console.log(data);
    this.stream.next({
      data,
      folderInitialized: true,
      refreshAttempt: this.refreshAttempt + 1,
    });
  }

  protected handleError(err: any) {
    if (err.error.statusCode === this.EMPTY_FOLDER_ERR_CODE) {
      this.stream.next({
        data: [],
        folderInitialized: true,
        refreshAttempt: this.refreshAttempt + 1,
      });
    } else {
      console.log('Folder refresh error: ', err);
      const oldData = this.stream.getValue();
      this.stream.next({
        ...oldData,
        refreshAttempt: this.refreshAttempt + 1,
      });
    }
  }

  public emptyFolder(): void {
    this.refreshAttempt = 0;
    this.stream.next({
      data: [],
      folderInitialized: false,
      refreshAttempt: this.refreshAttempt,
    });
  }

  public waitForActivation(): Observable<boolean> {
    if (!this.stream.getValue().folderInitialized) {
      this.refreshFolder();
      return this.stream.pipe(
        skipWhile(wrapper => wrapper.refreshAttempt === this.refreshAttempt),
        map(wrapper => {
          this.refreshAttempt++;
          return wrapper.folderInitialized;
        })
      );
    } else {
      return of(true);
    }
  }

}


export class TrashFolder extends SimpleFolder<Message> {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
  ) {
    super(http, secretar, GET_REQUEST_URL, null);
  }

  protected handleResponse(res: any): void {
    const dataJSON = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    const data = JSON.parse(dataJSON);
    // console.log((data.inbox).concat(data.sentMessages));
    this.stream.next({
      data: (data.inbox).concat(data.sentMessages),
      folderInitialized: true,
      refreshAttempt: this.refreshAttempt + 1,
    });
  }

  protected handleError(err: any): void {
    console.log('Trash refresh error: ', err);
    const oldData = this.stream.getValue();
    this.stream.next({
      ...oldData,
      refreshAttempt: this.refreshAttempt + 1,
    });
  }
}


export class AggregateFolder {

  public readonly contents: Observable<any[]>;

  constructor(private simpleFolders: SimpleFolder<Message>[]) {
    this.contents = combineLatest(simpleFolders.map(simpleFolder => simpleFolder.contents))
    .pipe(
      map(
        ArrayOfContents => ArrayOfContents.reduce(
          (accumulatedContents, nextContents) => accumulatedContents.concat(nextContents), []
        )
      )
    );
  }

  public refreshFolder(): void {
    this.simpleFolders.forEach(folder => {
      // console.log(folder);
      // this.refreshFolder();
    });
  }

  public emptyFolder(): void {
    // Do nothing... Simple folders empty by themselves
  }

  public waitForActivation(): Observable<boolean> {
    return combineLatest(
      this.simpleFolders.map(folder => folder.waitForActivation())
    )
    .pipe(map( activationSignals => activationSignals.every(signal => !!signal) ));
  }
}
