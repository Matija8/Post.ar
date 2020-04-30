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
  refreshAttempt: number;
  data: T;
  refreshed: boolean;
}


export class SimpleFolder<T> extends Folder {

  refreshAttempt = 0;
  private readonly stream = new BehaviorSubject<RefreshWrapper<T[]>>({
    refreshAttempt: this.refreshAttempt,
    data: [],
    refreshed: false
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
        const data = this.secretar.decryptAndVerify(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        ).data.replace('/"', '"');
        console.log('Folder refresh data: ', data);
        this.stream.next({
          refreshAttempt: this.refreshAttempt + 1,
          data: JSON.parse(data),
          refreshed: true
        });
      },
      (err: any) => {
        console.log(err.error.statusCode);
        if (err.error.statusCode === this.EMPTY_FOLDER_ERR_CODE) {
          this.stream.next({
            refreshAttempt: this.refreshAttempt + 1,
            data: [],
            refreshed: true
          });
        } else {
          console.log('Folder refresh error: ', err);
          this.stream.next({
            refreshAttempt: this.refreshAttempt + 1,
            data: [],
            refreshed: false
          });
        }
      }
    );
  }

  public emptyFolder(): void {
    this.refreshAttempt = 0;
    this.stream.next({
      refreshAttempt: 0,
      data: [],
      refreshed: false
    });
  }

  public waitForActivation(): Observable<boolean> {
    if (!this.stream.getValue().refreshed) {
      this.refreshFolder();
      return this.stream.pipe(
        skipWhile(wrapper => wrapper.refreshAttempt === this.refreshAttempt),
        map(wrapper => {
          this.refreshAttempt++;
          return wrapper.refreshed;
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
