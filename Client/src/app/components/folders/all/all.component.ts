import { Component } from '@angular/core';
import { GetMailService } from '../../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-all',
  template: `
    <postar-mail-list
      [emptyFolderTipText]="'You have no mail.'"
      [folder]=folder>
    </postar-mail-list>`,
})
export class AllComponent {

  public folder = this.getMail.folders.all;

  constructor(private getMail: GetMailService) {}

}
