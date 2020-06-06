import { Component, OnInit, OnDestroy } from '@angular/core';
import { SMessage } from 'src/app/models/Messages';
import { GetMailService } from '../../../services/mail-services/get-mail.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'postar-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit, OnDestroy {

  private folder = this.getMail.folders.sent;
  private sentMsgSubscription: Subscription = null;
  public clearSelectedSubj: Subject<void>;

  public sentMessages: SMessage[];

  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.clearSelectedSubj = new Subject<void>();
    this.sentMsgSubscription = this.folder.contents.subscribe(
      (messages: SMessage[]): void => {
        this.sentMessages = messages;
        this.clearSelectedSubj.next();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sentMsgSubscription !== null) {
      this.sentMsgSubscription.unsubscribe();
      this.sentMsgSubscription = null;
    }
    this.clearSelectedSubj = null;
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

}
