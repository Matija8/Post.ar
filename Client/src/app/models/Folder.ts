import { BehaviorSubject, Observable, of } from 'rxjs';
import { skipWhile, map } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';
import { HttpWrapperService } from '../services/mail-services/http-wrapper.service';


export class Folder {

  private readonly stream = new BehaviorSubject<Message[]>(null);
  public readonly contents: Observable<Message[]> = this.stream.asObservable();

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private readonly GET_REQUEST_URL: string
  ) {}

  public refreshFolder() {
    this.http.get(this.GET_REQUEST_URL).subscribe(
      (res: any) => {
        const data = this.secretar.decryptAndVerify(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        ).data.replace('/"', '"');
        console.log('Folder refresh data: ', data);
        this.stream.next(JSON.parse(data));
      },
      (err: any) => {
        console.log(err.error.statusCode);
        if ([1005, 1009].includes(err.error.statusCode)) {
          this.stream.next([]);
        } else {
          console.log('Folder refresh error: ', err);
        }
      }
    );
  }

  public emptyFolder(): void {
    this.stream.next(null);
  }

  public waitForActivation(): Observable<boolean> {
    if (!this.stream.getValue()) {
      this.refreshFolder();
    }
    return this.stream.pipe(
      skipWhile(messages => messages === null),
      map(messages => !!messages));
  }

}
