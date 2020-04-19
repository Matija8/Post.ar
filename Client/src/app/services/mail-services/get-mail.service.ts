import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Message, RMessage, SMessage } from '../../models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly INBOX_URL = 'http://localhost:8000/inbox';
  private readonly SENT_URL = 'http://localhost:8000/sentMail';

  private readonly VALID_FOLDERS = Object.freeze(['inbox', 'sent', 'starred']); // TODO: enum?

  private readonly httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  private readonly inboxStream = new BehaviorSubject<RMessage[]>(null);
  private readonly sentStream = new BehaviorSubject<SMessage[]>(null);


  public readonly folders = Object.freeze({
    inbox: Object.freeze({
      observable: this.inboxStream.asObservable(),
      refresh: this.refreshInbox.bind(this)
    }),
    sent: Object.freeze({
      observable: this.sentStream.asObservable(),
      refresh: this.refreshSent.bind(this)
    })
  });


  private readonly cache = Object.seal({
    inbox: null as RMessage[],
    sent: null as SMessage[],
    get starred(): Message[] {
      // TODO: update Message model and uncomment below.
      // return (this.inbox).concat(this.sent).filter(msg => msg.starred);
      return [];
    },
    get all(): Message[] {
      return (this.inbox).concat(this.sent);
    }
  });


  constructor(private http: HttpClient) {
    Object.keys(this.folders).forEach(folder => {
      this.folders[folder].observable.subscribe((messages: Message[]) => this.cache[folder] = messages);
    });
  }


  private refreshInbox() {
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
    this.inboxStream.next([
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


  private refreshSent() {
    this.http.get(this.SENT_URL, this.httpOptions).subscribe(
      (res: any) => {
        console.log(`get-mail: refreshSent: ${res}`);
        // this.sentMsgSource.next(...);
      },
      (err: any) => {
        console.log(err);
      }
    );
    // TODO: remove this after fixing cookies and setting data inside http.get
    this.sentStream.next([
      {
        id: 1,
        sentTo: 'Pera',
        cc: 'cc, blabla',
        messageText: 'Ovo je za testiranje'
      },
      {
        id: 2,
        sentTo: 'Luka',
        cc: 'Angular1',
        messageText: 'Testiranje x2'
      }
    ]);
  }

  getMsgById(id: number, folder: string): Message {
    if (folder === undefined) {
      folder = 'all';
      // TODO: update cache...
      // TODO: implement
    }
    const messagesToSearch = this.cache[folder] as Message[];
    if (messagesToSearch === undefined) {
      return null;
    }
    if (messagesToSearch === null) {
      this.folders[folder].refresh();
      // TODO: make async somehow? Race condition?
      return null;
    }
    return messagesToSearch.find(message => message.id === id);
  }

  validFolder(folder: string): boolean {
    return this.VALID_FOLDERS.includes(folder);
  }
}
