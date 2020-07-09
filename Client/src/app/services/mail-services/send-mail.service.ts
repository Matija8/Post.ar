import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { SecretarService } from '../secretar/secretar.service';
import { SMessage } from 'src/app/models/Messages';
import { Endpoint } from 'src/app/endpoint';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
    private secretar: SecretarService,
    private snackBarService: SnackbarService
  ) {}

  validMessage(message: EditorMessage): boolean {
    if (message.subject && message.messageText && this.validTo(message.to)) {
      return false;
    }
    return true;
  }

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
        this.snackBarService.openSnackBar("Message sent successfully");
      },
      (err: any) => {
        console.log(err);
        this.snackBarService.openSnackBar("Unexpected error, failed to send email. Please try again later");
      }
    );
  }

}
