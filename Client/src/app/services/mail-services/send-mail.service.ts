import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    ) {}


  validTo(to: string): boolean {
    return !!to.match(/^[a-zA-Z][a-zA-Z0-9]*@post\.ar$/);
  }

  send(message: EditorMessage) {
    this.http.post('http://localhost:8000/send', {
      to: message.to,
      subject: message.subject,
      content: message.messageText
    }).subscribe(
      (res: any) => {
        console.log(res);
        // TODO: Nemoj da refreshujes nego poruku koju dobijes nazad appenduj na sent!
        this.getMail.folders.sent.refreshFolder();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
