import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { skipWhile, map } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';


export class Folder {

  private readonly stream = new BehaviorSubject<Message[]>(null);
  public readonly contents: Observable<Message[]> = this.stream.asObservable();
  private folderActivated = false;

  private readonly httpOptions = {
    headers : new HttpHeaders({ 'Content-type' : 'application/json' }),
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private secretar: SecretarService,
    private readonly GET_REQUEST_URL: string
  ) {
    this.stream.subscribe( messages => this.folderActivated = !!messages );
  }

  public refreshFolder() {
    // TODO: delete id and test msg after testing.
    let id = 0;
    let testMsg: Message[] = [];
    this.http.get(this.GET_REQUEST_URL, this.httpOptions).subscribe(
      (res: any) => {
        const data = this.secretar.decrypt(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        );
        console.log('Folder refresh data: ', data);
        testMsg = testMsg.concat([{
          id: id++,
          sender: 'Sendera simulira random broj izmedju 0 i 10: ' + String(Math.floor(Math.random() * 20)),
          cc: String(Math.floor(Math.random() * 10) + 20) + ' je nasumicni broj od 20 do 30',
          messageText: String(Math.floor(Math.random() * 10)) + ' je nasumicni broj od 0 do 10'
        }]);
        this.stream.next(testMsg);
      },
      (err: any) => {
        console.log(err.error.statusCode);
        if ([1005, 1009].includes(err.error.statusCode)) {
          testMsg = testMsg.concat([{
            id: id++,
            sender: 'Sendera simulira random broj izmedju 0 i 20: ' + String(Math.floor(Math.random() * 20)),
            cc: String(Math.floor(Math.random() * 10) + 20) + ' je nasumicni broj od 20 do 30',
            messageText: String(Math.floor(Math.random() * 10)) + ' je nasumicni broj od 0 do 10'
          }]);
          this.stream.next(testMsg);
        } else {
          console.log('Folder refresh error: ', err);
        }
      }
    );
  }

  public waitForActivation(): Observable<boolean> {
    if (!this.folderActivated) {
      this.refreshFolder();
      return this.stream.pipe(
        skipWhile(messages => messages === null),
        map(messages => !!messages));
    } else {
      return of(true);
    }
  }

}
