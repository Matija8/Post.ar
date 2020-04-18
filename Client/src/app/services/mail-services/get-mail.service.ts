import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message, RMessage, SMessage } from '../../models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly VALID_FOLDERS = ['inbox', 'sent', 'starred'];
  private readonly httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  private readonly INBOX_URL = 'http://localhost:8000/inbox';
  private inboxSource: BehaviorSubject<RMessage[]>;
  public readonly inboxCache: Observable<RMessage[]>;

  private readonly SENT_URL = 'http://localhost:8000/sentMail';
  private sentMsgSource: BehaviorSubject<SMessage[]>;
  public readonly sentMsgCache: Observable<SMessage[]>;


  constructor(private http: HttpClient) {
    this.inboxSource = new BehaviorSubject<RMessage[]>([]);
    this.inboxCache = this.inboxSource.asObservable();

    this.sentMsgSource = new BehaviorSubject<SMessage[]>([]);
    this.sentMsgCache = this.sentMsgSource.asObservable();
  }

  refreshInbox() {
    // TODO: send session id using cookies
    this.http.get(this.INBOX_URL, this.httpOptions).subscribe(
      (res: any) => {
        console.log(`get-mail: refreshInbox: ${res}`);
        // TODO: Set as inboxSource value. Can't now because cookies are not set (recives 401 from server)
        // this.inboxSource.next();
      },
      (err: any) => {
        console.log(err);
      }
    );

    // TODO: remove this after fixing cookies and setting data inside http.get
    this.inboxSource.next([
      {
        id: 1,
        sender: 'Matija',
        cc: 'Angular',
        messageText: 'Neka veeeeelika poruka'
      },
      {
        id: 2,
        sender: 'Stefan',
        cc: 'Angular1',
        messageText: 'jos neka velika poruka'
      }
    ]);
  }

  refreshSent() {
    this.http.get(this.INBOX_URL, this.httpOptions).subscribe(
      (res: any) => {
        console.log(`get-mail: refreshSent: ${res}`);
        // this.sentMsgSource.next(...);
      },
      (err: any) => {
        console.log(err);
      }
    );

    // TODO: remove this after fixing cookies and setting data inside http.get
    this.sentMsgSource.next([
      {
        id: 1,
        sentTo: 'Pera',
        cc: 'Angular',
        messageText: 'Neka veeeeelika poruka'
      },
      {
        id: 2,
        sentTo: 'Luka',
        cc: 'Angular1',
        messageText: 'jos neka velika poruka'
      }
    ]);
  }

  getMsgById(id: number, folder: string): Message {
    if (folder !== undefined && !this.validFolder(folder)) {
      return null;
    }
    let msg = null;
    switch (folder) {
      case 'inbox': {
        // TODO: Ovo je sigurno lose. Promeni.
        this.inboxCache.subscribe(
          (messages: RMessage[]) => { msg = messages.find(foundMsg => foundMsg.id === id); }
        ).unsubscribe();
        break;
      }
      case 'sent': {
        this.sentMsgCache.subscribe(
          (messages: SMessage[]) => { msg = messages.find(foundMsg => foundMsg.id === id); }
        ).unsubscribe();
        break;
      }
      case 'starred': {
        //
        break;
      }
      case undefined: {
        //
        break;
      }
    }
    return msg;
  }

  validFolder(folder: string): boolean {
    return this.VALID_FOLDERS.includes(folder);
  }
}
