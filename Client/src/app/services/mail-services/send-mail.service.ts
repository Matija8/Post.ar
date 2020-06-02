import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { SecretarService } from '../secretar/secretar.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    private secretar: SecretarService
  ) {}


  validTo(to: string): boolean {
    return !!to.match(/^[a-zA-Z][a-zA-Z0-9]*@post\.ar$/);
  }

  send(message: EditorMessage) {
    const encryptedMessage = this.secretar.encryptMessage({subject: message.subject, body: message.messageText});
    this.http.post('http://localhost:8000/send', {
      to: message.to,
      content: encryptedMessage
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
