import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-trash',
  templateUrl: './trashed.component.html',
  styleUrls: ['./trashed.component.css']
})
export class TrashedComponent implements OnInit, OnDestroy {
  private folder = this.getMail.folders.all;
  private subscription: Subscription = null;

  private allMessages: Message[];
  public trashedMessages: Message[];

  constructor(private getMail: GetMailService) { }

  ngOnInit(): void {
    this.subscription = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.allMessages = messages;
        this.softRefresh();
      },
      (error: any): void => {
        console.log('Error during trashed subscription: ', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  softRefresh(): void {
    this.trashedMessages = this.allMessages.filter(message => message.isDeleted);
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

}
