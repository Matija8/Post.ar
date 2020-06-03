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
    const content = this.secretar.encryptMessage({ body: edMsg.messageText });
    const draftToSave = {
      subject: edMsg.subject,
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

  // TODO: discardDraft() {}

}
