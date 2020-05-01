import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from '../../../services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit, OnDestroy {

  private folder = this.getMail.folders.starred;
  private subscription: Subscription = null;

  public starredMessages: Message[];

  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.subscription = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.starredMessages = messages;
      },
      (err): void => {
        console.log('Error in starred subscription', err);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

}
