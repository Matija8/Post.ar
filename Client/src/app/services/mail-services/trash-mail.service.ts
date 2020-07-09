import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { TagData } from 'src/app/models/TagData/TagData';
import { Endpoint } from 'src/app/endpoint';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TrashMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    private snackBarService: SnackbarService
  ) {}

  moveToTrash(messages: TagData[]): Observable<any> {
    const response = this.http.post(Endpoint.TRASH + '/delete', {messages});
    response.subscribe(
      (res: any): void => {
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder(); // 'all' = inbox + sent!
      },
      (err: any): void => {
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
        this.snackBarService.openSnackBar("Unexpected error, failed to move message to trash. Please try again later");
      }
    );
    return response;
  }

  restoreFromTrash(messages: TagData[]): Observable<any> {
    const response = this.http.post(Endpoint.TRASH + '/undoDelete', {messages});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        this.getMail.folders.trash.refreshFolder();
        this.getMail.folders.all.refreshFolder();
        this.snackBarService.openSnackBar("Unexpected error, failed to restore messages from trash. Please try again later");
      }
    );
    return response;
  }

  deleteForever(messages: TagData[]): Observable<any> {
    const response = this.http.post(Endpoint.TRASH + '/deleteForever', {messages});
    response.subscribe(
      (res: any): void => {
        console.log('trash-mail-service', res);
        this.getMail.folders.trash.refreshFolder();
        this.snackBarService.openSnackBar("Messages deleted forever successfully");
      },
      (err: any): void => {
        console.log('trash-mail-service', err);
        this.getMail.folders.trash.refreshFolder();
        this.snackBarService.openSnackBar("Unexpected error, failed to delete messages forever. Please try again later");
      }
    );
    return response;
  }
}
