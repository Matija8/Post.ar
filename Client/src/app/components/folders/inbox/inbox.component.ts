import { Component } from '@angular/core';
import { GetMailService } from '../../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-inbox',
  template: `
    <postar-mail-list
      [emptyFolderTipText]="'Inbox is empty!'"
      [folder]=folder>
    </postar-mail-list>`,
})
export class InboxComponent {

  public folder = this.getMail.folders.inbox;

  constructor(private getMail: GetMailService) {}

}
