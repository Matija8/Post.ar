import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable, throwError, zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditorMessage } from 'src/app/models/Compose';
import { SecretarService } from '../secretar/secretar.service';
import { Endpoint } from 'src/app/endpoint';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DraftMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    private secretar: SecretarService,
    private snackBarService: SnackbarService
  ) {}

  saveDraft(edMsg: EditorMessage): Observable<any> {
    if (!edMsg) {
      return throwError('Bad editor message!');
    }
    const content = this.secretar.encryptMessage({
      to: edMsg.to,
      subject: edMsg.subject,
      body: edMsg.messageText,
    });
    const response = this.http.post(Endpoint.DRAFTS + '/save', { content });
    response.subscribe(
      (res: any) => {
        // console.log(res);
        this.getMail.folders.drafts.refreshFolder();
        this.snackBarService.openSnackBar('Successfully saved message as draft');
      },
      (err: any) => {
        console.log(err);
        this.snackBarService.openSnackBar('Unexpected error, failed to save message as draft. Please try again later');
      }
    );
    return response.pipe(take(1));
  }

  discardDraft(draftId: string): Observable<any> {
    return this.discardDrafts([draftId]);
  }

  discardDrafts(draftIds: string[]): Observable<any> {
    if (!draftIds || draftIds.length < 1) {
      return;
    }
    const s = draftIds.length > 1 ? 's' : '';
    const response = this.http.post(`${Endpoint.DRAFTS}/discard`, { messageIds: draftIds });
    response.subscribe(
      (res: any) => {
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        this.getMail.folders.drafts.refreshFolder();
        this.snackBarService.openSnackBar(`Unexpected error, failed to discard message${s} as drafts. Please try again later`);
        console.log(err);
      }
    );
    return response.pipe(take(1));
  }

}
