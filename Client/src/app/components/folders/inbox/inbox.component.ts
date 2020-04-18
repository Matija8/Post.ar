import { Component, OnInit, OnDestroy } from '@angular/core';
import { RMessage } from 'src/app/models/Messages';
import { GetMailService } from '../../../services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  static firstTime = true;
  inboxMessages: RMessage[];
  inboxSubscription: Subscription = null;

  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.inboxSubscription = this.getMail.inboxCache.subscribe(
      (messages: RMessage[]): void => {
        this.inboxMessages = messages;
      }
    );
    if (InboxComponent.firstTime) {
      InboxComponent.firstTime = false;
      this.getMail.refreshInbox();
    }
  }

  ngOnDestroy(): void {
    if (this.inboxSubscription !== null) {
      this.inboxSubscription.unsubscribe();
    }
  }

}
