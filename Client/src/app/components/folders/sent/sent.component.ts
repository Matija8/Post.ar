import { Component } from '@angular/core';
import { GetMailService } from '../../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-sent',
  template: `
    <postar-mail-list
      [emptyFolderTipText]="'No sent messages!'"
      [folder]=folder>
    </postar-mail-list>`,
})
export class SentComponent {

  public folder = this.getMail.folders.sent;

  constructor(private getMail: GetMailService) {}

}
