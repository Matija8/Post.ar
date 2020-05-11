import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { MessageFolder } from 'src/app/models/Folder';

@Injectable({
  providedIn: 'root'
})
export class TrashMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  moveToTrash(messageId: string, type: string): Observable<any> {
    // TODO: 'type' type safety? Inbox | Sent?
    const sourceFolder = this.getMail.folders[type] as MessageFolder;
    // Folders are updated here!
    sourceFolder.removeByIds([messageId]);

    const response = this.http.post('http://localhost:8000/trashMessage', {messageId, type});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        sourceFolder.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }

  // TODO: Change to array of messages ({messageId: string, type: string}[])
  // after server gets updated to accept that format.
  // 'Type' (folder) might not be neccessary.
  restoreFromTrash(messageId: string, type: string) {
    // TODO
    console.log('trash-mail service: Restore from trash called (TODO)');

    const sourceFolder = this.getMail.folders[type] as MessageFolder;
    // Folders are updated here!
    sourceFolder.removeByIds([messageId]);

    const response = this.http.post('http://localhost:8000/removeTrashMessage', {messageId, type});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        sourceFolder.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }

  deleteForever(messageId: string, type: string) {
    // TODO
    console.log('trash-mail service: Delete forever called (TODO)');
    // TODO: Add remove by ids to trash.
    // this.getMail.folders.trash.removeByIds();

    const sourceFolder = this.getMail.folders[type] as MessageFolder;
    // Folders are updated here!
    sourceFolder.removeByIds([messageId]);

    const response = this.http.post('http://localhost:8000/deleteMessage', {messageId, type});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        sourceFolder.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }
}
