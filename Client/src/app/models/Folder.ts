import { BehaviorSubject, Observable, of, combineLatest, zip } from 'rxjs';
import { skipWhile, map, take } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';
import { HttpWrapperService } from '../services/mail-services/http-wrapper.service';

export abstract class Folder {
  public readonly contents: Observable<any[]>;
  public abstract refreshFolder(): void;
  public abstract emptyFolder(): Observable<boolean>;
  public abstract waitForActivation(): Observable<boolean>;
}


export class SimpleFolder<T> extends Folder {
  protected readonly stream = new BehaviorSubject<T[]>(null);
  public readonly contents: Observable<T[]> = this.stream.asObservable();

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
    this.stream.next(data);
  }

  protected handleError(err: any) {
    if (err.error.statusCode === this.EMPTY_FOLDER_ERR_CODE) {
      this.stream.next([]);
    } else {
      // TODO: handle error in folder.guard.ts?
      console.log(err);
      this.stream.error(err);
    }
  }

  public emptyFolder(): Observable<boolean> {
    this.stream.next(null);
    return this.stream.pipe(
      skipWhile(data => data !== null),
      map(_ => true),
      take(1)
    );
  }

  public waitForActivation(): Observable<boolean> {
    if (this.stream.getValue() === null) {
      this.refreshFolder();
    }
    return this.stream.pipe(
      skipWhile(data => data === null),
      map(data => !!data)
    );
  }

}


export class MessageFolder extends SimpleFolder<Message> {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
    EMPTY_FOLDER_ERR_CODE: number
  ) {
    super(http, secretar, GET_REQUEST_URL, EMPTY_FOLDER_ERR_CODE);
  }

  public removeByIds(idsToDelete: string[]): void {
    this.stream.next(this.stream.getValue().filter(msg => !idsToDelete.includes(msg.messageId)));
  }
}


// TODO: Server format tmp.
export class InboxTmp extends MessageFolder {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
    EMPTY_FOLDER_ERR_CODE: number
  ) {
    super(http, secretar, GET_REQUEST_URL, EMPTY_FOLDER_ERR_CODE);
  }

  protected handleResponse(res: any) {
    const data = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    this.stream.next(data);
  }
}
// /TODO: Server format tmp.


export class TrashFolder extends SimpleFolder<Message> {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
  ) {
    super(http, secretar, GET_REQUEST_URL, null);
  }

  protected handleResponse(res: any): void {
    // TODO: Server format tmp.
    // Before server format change.
    /* const dataJSON = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    const data = JSON.parse(dataJSON); */
    const data = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    console.log('handleResponse trash folder:', data);
    this.stream.next(data.inbox.concat(data.sent));
    // /TODO: Server format tmp.
  }

  protected handleError(err: any): void {
    // TODO: handle error in folder.guard.ts?
    console.log(err);
    this.stream.error(err);
  }
}


export class AggregateFolder {

  public readonly contents: Observable<any[]>;

  constructor(private simpleFolders: SimpleFolder<Message>[]) {
    this.contents = combineLatest(simpleFolders.map(simpleFolder => simpleFolder.contents))
    .pipe(
      map(ArrayOfContents => ArrayOfContents.reduce((accumulatedContents, nextContents) => accumulatedContents.concat(nextContents), [])
      )
    );
  }

  public refreshFolder(): void {
    this.simpleFolders.forEach(folder => {
      folder.refreshFolder();
    });
  }

  public emptyFolder(): Observable<boolean> {
    return zip(
      ...this.simpleFolders.map(folder => folder.emptyFolder())
    ).pipe(
      map(_ => true),
      take(1)
    );
  }

  public waitForActivation(): Observable<boolean> {
    return combineLatest(
      this.simpleFolders.map(folder => folder.waitForActivation())
    )
    .pipe(map( activationSignals => activationSignals.every(signal => !!signal) ));
  }
}
