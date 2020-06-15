import { Component } from '@angular/core';
import { GetMailService } from '../../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-inbox',
  template: `
    <postar-mail-list
      [folder]=folder>
    </postar-mail-list>`,
})
export class InboxComponent {

  public folder = this.getMail.folders.inbox;

  constructor(private getMail: GetMailService) {}

}
