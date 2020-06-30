import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { SecretarService } from '../secretar/secretar.service';
import { SMessage } from 'src/app/models/Messages';
import { Endpoint } from 'src/app/endpoint';

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
    const contentToEncrypt = {
      subject: message.subject,
      content: message.messageText
    };
    const content = this.secretar.encryptMessage(contentToEncrypt);
    this.http.post(Endpoint.SEND, {
      to: message.to,
      content,
    }).subscribe(
      (res: any) => {
        console.log(res);
        this.getMail.folders.sent.refreshFolder();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
