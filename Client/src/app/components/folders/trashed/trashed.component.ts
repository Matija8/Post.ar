import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable/Selectable';
import { TagDataSet } from 'src/app/models/TagData/TagDataSet';

@Component({
  selector: 'postar-trash',
  templateUrl: './trashed.component.html',
  styleUrls: ['./trashed.component.css']
})
export class TrashedComponent extends Selectable implements OnInit, OnDestroy {
  private folder = this.getMail.folders.trash;
  private subscription: Subscription = null;

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

  onDeleteForever([messageId, type]: [string, string]): void {
    // TODO: Convert to tagData[], as well as trashMail.deleteForever.
    console.log('Trashed component.ts: onDeleteForever (TODO)');
    // this.trashMail.deleteForever(messageId, type);
  }

  onRestore([messageId, type]: [string, string]): void {
    // TODO
    console.log('Trashed component.ts: onRestore');
    // this.trashMail.restoreFromTrash(messageId, type);
  }

}
