import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { TagData } from 'src/app/models/TagData/TagData';
import { Folder } from 'src/app/models/Folder';
import { Message } from 'src/app/models/Messages';
import { Endpoint } from 'src/app/endpoint';

@Injectable({
  providedIn: 'root'
})
export class TagMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  star(messages: TagData[], value: boolean): Observable<any> {
    const response = value ?
        this.http.post(Endpoint.STARRED + '/save', {messages})
      : this.http.post(Endpoint.STARRED + '/remove', {messages});
    response.subscribe(
      (res: any): void => {
        this.getMail.folders.all.refreshFolder();
      },
      (err: any): void => {
        console.log(err);
        this.getMail.folders.all.refreshFolder();
      }
    );
    return response;
  }

  private markAsReadOrUnread(messageIds: string[], markRead: boolean): Observable<any> {
    const baseUrl = Endpoint.INBOX + '/';
    const url = baseUrl + (markRead ? 'markAsRead' : 'markAsUnread');
    const response = this.http.post(url, { messageIds });
    response.subscribe(
      (res: any): void => {
        this.getMail.folders.inbox.refreshFolder();
      },
      (err: any): void => {
        console.log(err);
      }
    );
    return response;
  }

  markAsRead(messageIds: string[]): Observable<any> {
    return this.markAsReadOrUnread(messageIds, true);
  }

  markAsUnread(messageIds: string[]): Observable<any> {
    return this.markAsReadOrUnread(messageIds, false);
  }

}
