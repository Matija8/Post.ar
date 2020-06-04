import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditorMessage } from 'src/app/models/Compose';
import { SecretarService } from '../secretar/secretar.service';

@Injectable({
  providedIn: 'root'
})
export class DraftMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    private secretar: SecretarService,
  ) {}

  saveDraft(edMsg: EditorMessage): Observable<any> {
    if (!edMsg) {
      return throwError('Bad editor message!');
    }
    if (!edMsg.to) {
      return throwError('Server needs "to" to save the draft!');
    }
    const content = this.secretar.encryptMessage({
      subject: edMsg.subject,
      body: edMsg.messageText,
    });
    const draftToSave = {
      to: edMsg.to,
      content,
    };
    const response = this.http.post('http://localhost:8000/drafts/save', draftToSave);
    response.subscribe(
      (res: any) => {
        console.log(res);
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        console.log(err);
      }
    );
    return response.pipe(take(1));
  }

  discardDraft(draftId: string): void {
    const response = this.http.post('http://localhost:8000/drafts/discard', { messageId: draftId });
    response.subscribe(
      (res: any) => {
        console.log(res);
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  discardDrafts(draftIds: string[]): void {
    for (const draftId of draftIds) {
      this.discardDraft(draftId);
    }
  }

}
