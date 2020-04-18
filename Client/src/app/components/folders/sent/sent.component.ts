import { Component, OnInit, OnDestroy } from '@angular/core';
import { SMessage } from 'src/app/models/Messages';
import { GetMailService } from '../../../services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit, OnDestroy {

  static firstTime = true;
  sentMessages: SMessage[];
  sentMsgSubscription: Subscription = null;

  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.sentMsgSubscription = this.getMail.sentMsgCache.subscribe(
      (messages: SMessage[]): void => {
        this.sentMessages = messages;
      }
    );
    if (SentComponent.firstTime) {
      SentComponent.firstTime = false;
      this.getMail.refreshSent();
    }
  }

  ngOnDestroy(): void {
    if (this.sentMsgSubscription !== null) {
      this.sentMsgSubscription.unsubscribe();
    }
  }

}
