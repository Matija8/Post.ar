import { Injectable } from '@angular/core';
import { EditorMessage } from '../../models/Compose';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { SecretarService } from '../secretar/secretar.service';
import { Endpoint } from 'src/app/endpoint';
import { SnackbarService } from '../snackbar/snackbar.service';
import { validEmailRegex } from 'src/app/models/User';

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
    // TODO: Regex check for subject and text?
    const validTo = validEmailRegex.test(message.to);
    const validSubject = !!message.subject;
    const validText = !!message.messageText;
    return validTo && validSubject && validText;
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
        this.snackBarService.openSnackBar('Message sent successfully');
      },
      (err: any) => {
        console.log(err);
        this.snackBarService.openSnackBar('Unexpected error, failed to send email. Please try again later');
      }
    );
  }

}
