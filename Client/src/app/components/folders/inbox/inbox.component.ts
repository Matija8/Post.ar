import { Component, OnInit, OnDestroy } from '@angular/core';
import { RMessage } from 'src/app/models/Messages';
import { GetMailService } from '../../../services/mail-services/get-mail.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'postar-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  private folder = this.getMail.folders.inbox;
  private inboxSubscription: Subscription = null;
  public clearSelectedSubj: Subject<void>;

  public inboxMessages: RMessage[];

  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.clearSelectedSubj = new Subject<void>();
    this.inboxSubscription = this.folder.contents.subscribe(
      (messages: RMessage[]): void => {
        this.inboxMessages = messages;
        this.clearSelectedSubj.next();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.inboxSubscription !== null) {
      this.inboxSubscription.unsubscribe();
      this.inboxSubscription = null;
    }
    this.clearSelectedSubj = null;
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

}
