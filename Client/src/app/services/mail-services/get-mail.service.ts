import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RMessage } from '../../models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly INBOX_URL = 'http://localhost:8000/inbox';
  private httpOptions = {
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
}
