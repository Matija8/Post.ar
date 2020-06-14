import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { TagData } from 'src/app/models/TagData/TagData';
import { Folder } from 'src/app/models/Folder';
import { Message } from 'src/app/models/Messages';

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
        this.http.post('http://localhost:8000/starred/save', {messages})
      : this.http.post('http://localhost:8000/starred/remove', {messages});
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

  markAsRead(messages: TagData[]) {
    const messageIds: string[] = [];
    for (const {messageId, type} of messages) {
      messageIds.push(messageId);
    }

    const response = this.http.post('http://localhost:8000/inbox/markAsRead', messageIds);
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

  markAsUnread(messages: TagData[]) {
    const messageIds: string[] = [];
    for (const {messageId, type} of messages) {
      messageIds.push(messageId);
    }

    const response = this.http.post('http://localhost:8000/inbox/markAsUnread', messageIds);
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

}
