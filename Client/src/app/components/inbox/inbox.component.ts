import { Component, OnInit } from '@angular/core';
import { RMessage } from '../../models/Messages';
import { GetMailService } from '../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  inboxMessages: RMessage[];
  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    // TODO: subscribe to an observable from getMail and get inbox that way
    this.inboxMessages = this.getMail.getInboxMessages();
  }

}
