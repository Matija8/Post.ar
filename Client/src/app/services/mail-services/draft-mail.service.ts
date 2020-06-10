import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable, throwError, zip } from 'rxjs';
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
        // console.log(res);
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        console.log(err);
      }
    );
    return response.pipe(take(1));
  }

  discardDraft(draftId: string): Observable<any> {
    const response = this.http.post('http://localhost:8000/drafts/discard', { messageId: draftId });
    response.subscribe(
      (res: any) => {
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        console.log(err);
        this.getMail.folders.drafts.refreshFolder();
      }
    );
    return response.pipe(take(1));
  }

  discardDrafts(draftIds: string[]): Observable<any> {
    const responses = [];
    for (const draftId of draftIds) {
      responses.push(this.discardDraft(draftId));
    }
    console.log(responses);
    const zipped = zip(...responses).pipe(take(1));
    zipped.subscribe(
      (res: any) => {
        this.getMail.folders.drafts.refreshFolder();
      },
      (err: any) => {
        this.getMail.folders.drafts.refreshFolder();
        console.log(err);
      }
    );
    return zipped;
  }

}
