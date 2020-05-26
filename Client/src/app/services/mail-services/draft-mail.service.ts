import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditorMessage, toDraftable } from 'src/app/models/Compose';

@Injectable({
  providedIn: 'root'
})
export class DraftMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  saveDraft(edMsg: EditorMessage): Observable<any> {
    if (!edMsg) {
      return;
    }
    const draftToSave = toDraftable(edMsg);
    if (!draftToSave.content) {
      console.log('Server requires content != "" to save a draft.');
      return;
    }
    const response = this.http.post('http://localhost:8000/saveDraft', draftToSave);
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
