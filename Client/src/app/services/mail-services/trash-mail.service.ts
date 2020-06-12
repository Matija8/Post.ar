import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { TagData } from 'src/app/models/TagData/TagData';

@Injectable({
  providedIn: 'root'
})
export class TrashMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  moveToTrash(messages: TagData[]): Observable<any> {
    const response = this.http.post('http://localhost:8000/trash/delete', {messages});
    response.subscribe(
      (res: any): void => {
        this.getMail.folders.inbox.refreshFolder();
        this.getMail.folders.sent.refreshFolder();
      },
      (err: any): void => {
        this.getMail.folders.inbox.refreshFolder();
        this.getMail.folders.sent.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }

  restoreFromTrash(messages: TagData[]) {
    // TODO
    console.log('trash-mail service: Restore from trash called (TODO)');

    const messagesPerFolder = new Map<string, string[]>();
    for (const {messageId, type} of messages) {
      const newMessages = messagesPerFolder.get(type) || [];
      newMessages.push(messageId);
      messagesPerFolder.set(type, newMessages);
    }

    const response = this.http.post('http://localhost:8000/trash/undoDelete', {messages});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        this.getMail.folders.inbox.refreshFolder();
        this.getMail.folders.sent.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }

  deleteForever(messages: TagData[]) {
    // TODO
    console.log('trash-mail service: Delete forever called (TODO)');

    const messagesPerFolder = new Map<string, string[]>();
    for (const {messageId, type} of messages) {
      const newMessages = messagesPerFolder.get(type) || [];
      newMessages.push(messageId);
      messagesPerFolder.set(type, newMessages);
    }

    const response = this.http.post('http://localhost:8000/trash/deleteForever', {messages});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        this.getMail.folders.trash.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }
}
