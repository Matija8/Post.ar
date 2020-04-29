import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private readonly SEND_URL = 'http://localhost:8000/send';

  constructor(private http: HttpWrapperService) {}


  validTo(to: string): boolean {
    return !!to.match(/^[a-zA-Z][a-zA-Z0-9]*@post\.ar$/);
  }

  send(message: EditorMessage) {
    this.http.post(this.SEND_URL, {
      recipient: message.to,
      subject: message.subject,
      content: message.messageText
    }).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
