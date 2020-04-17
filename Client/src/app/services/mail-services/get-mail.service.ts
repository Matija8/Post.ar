import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RMessage, SMessage } from '../../models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly INBOX_URL = 'http://localhost:8000/inbox';
  private readonly httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  private inboxSource: BehaviorSubject<RMessage[]>;
  inboxCache: Observable<RMessage[]>;

  constructor(private http: HttpClient) {
    this.inboxSource = new BehaviorSubject([]);
    this.inboxCache = this.inboxSource.asObservable();
  }

  getInbox() {
    // TODO: send session id using cookies
    return this.http.get(this.INBOX_URL, this.httpOptions);
  }


  // Delete this after you implement getting messages from the server
  getInboxMessages(): RMessage[] {
    return [
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
    ];
  }

  // Delete this after you implement getting messages from the server
  getSentMessages(): SMessage[] {
    return [
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
    ];
  }
}
