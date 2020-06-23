import { Component } from '@angular/core';
import { GetMailService } from '../../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-starred',
  template: `
    <postar-mail-list
      [emptyFolderTipText]="'No starred messages!'"
      [folder]=folder>
    </postar-mail-list>`,
})
export class StarredComponent {

  public folder = this.getMail.folders.starred;

  constructor(private getMail: GetMailService) {}

}
