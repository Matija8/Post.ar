import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable/Selectable';
import { TagDataSet } from 'src/app/models/TagData/TagDataSet';
import { TagData } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent extends Selectable implements OnInit, OnDestroy {
  private folder = this.getMail.folders.trash;
  private folderSub: Subscription = null;
  public messages: Message[];

  constructor(
    private getMail: GetMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.selected = new TagDataSet();
    this.folderSub = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.messages = messages;
        this.selected = this.refreshSelectedSet(this.selected, messages);
      },
      (error: any): void => {
        console.log('Error during trashed subscription: ', error);
        this.selected.clear();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.folderSub !== null) {
      this.folderSub.unsubscribe();
      this.folderSub = null;
    }
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

  selectedChar(): string {
    return super.selectedChar(this.messages);
  }

  onDeleteForever(message: TagData): void {
    this.trashMail.deleteForever([message]);
  }

  onRestore(message: TagData): void {
    this.trashMail.restoreFromTrash([message]);
  }

  deleteSelected(): void {
    this.trashMail.deleteForever(this.selected.values());
  }

  restoreSelected(): void {
    this.trashMail.restoreFromTrash(this.selected.values());
  }

}
