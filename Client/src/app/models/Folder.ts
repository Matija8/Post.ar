import { BehaviorSubject, Observable, of } from 'rxjs';
import { skipWhile, map, take } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';
import { HttpWrapperService } from '../services/mail-services/http-wrapper.service';


export abstract class Folder {
  public readonly contents: Observable<any[]>;
  public abstract refreshFolder(): void;
  public abstract emptyFolder(): void;
  public abstract waitForActivation(): void;
}


interface RefreshWrapper<T> {
  data: T;
  folderInitialized: boolean;
  refreshAttempt: number;
  // refreshSuccessful: boolean;
}


export class SimpleFolder<T> extends Folder {

  private refreshAttempt = 0;
  private readonly stream = new BehaviorSubject<RefreshWrapper<T[]>>({
    data: [],
    folderInitialized: false,
    refreshAttempt: this.refreshAttempt,
    // refreshSuccessful: false
  });
  public readonly contents: Observable<T[]> = this.stream.pipe(map(wrapper => wrapper.data));

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private readonly GET_REQUEST_URL: string,
    private readonly EMPTY_FOLDER_ERR_CODE: number
  ) {
    super();
  }

  public refreshFolder(): void {
    this.http.get(this.GET_REQUEST_URL)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        const dataJSON = this.secretar.decryptAndVerify(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        ).data.replace('/"', '"');
        // console.log('Folder refresh data: ', dataString);
        // TODO: Validate data (data validation function taken as an argument by the constructor?!)
        const data = JSON.parse(dataJSON);
        this.stream.next({
          data,
          folderInitialized: true,
          refreshAttempt: this.refreshAttempt + 1,
          // refreshSuccessful: true
        });
      },
      (err: any) => {
        console.log(err.error.statusCode);
        if (err.error.statusCode === this.EMPTY_FOLDER_ERR_CODE) {
          this.stream.next({
            data: [],
            folderInitialized: true,
            refreshAttempt: this.refreshAttempt + 1,
            // refreshSuccessful: true
          });
        } else {
          console.log('Folder refresh error: ', err);
          const oldData = this.stream.getValue();
          this.stream.next({
            ...oldData,
            refreshAttempt: this.refreshAttempt + 1,
            // refreshSuccessful: false
          });
        }
      }
    );
  }

  public emptyFolder(): void {
    this.refreshAttempt = 0;
    this.stream.next({
      data: [],
      folderInitialized: false,
      refreshAttempt: this.refreshAttempt,
      // refreshSuccessful: false
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

// todo: Starred, All mail...
/* class AggregateFolder {

} */
