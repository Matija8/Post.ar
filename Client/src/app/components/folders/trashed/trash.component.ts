import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable/Selectable';
import { TagDataSet } from 'src/app/models/TagData/TagDataSet';
import { TagData, messageType } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent extends Selectable implements OnInit, OnDestroy {
  private folder = this.getMail.folders.trash;
  private subscription: Subscription = null;
  public messages: TagData[] = [];

  public trashedMessages: Message[];

  constructor(
    private getMail: GetMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.trashedMessages = messages;
      },
      (error: any): void => {
        console.log('Error during trashed subscription: ', error);
      }
    );
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.selected = null;
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

  selectedChar(): string {
    return super.selectedChar(this.trashedMessages);
  }

  onDeleteForever([messageId, type]: [string, messageType]): void {
    // TODO: Convert to tagData[], as well as trashMail.deleteForever.
    console.log('Trashed component.ts: onDeleteForever (TODO)');
    this.messages.push({messageId, type});
    this.trashMail.deleteForever(this.messages);
  }

  onRestore([messageId, type]: [string, messageType]): void {
    // TODO
    console.log('Trashed component.ts: onRestore: messageId: ', messageId, ' type: ', type);
    this.messages.push({messageId, type});
    this.trashMail.restoreFromTrash(this.messages);
  }

}
