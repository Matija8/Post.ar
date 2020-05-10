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
        console.log('Tag-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
      },
      (err: any): void => {
        console.log('Tag-mail-service', err);
        sourceFolder.refreshFolder();
        // TODO: A pop-up (modal) that informs user that deleting failed!?
      }
    );

    return response;
  }
}
