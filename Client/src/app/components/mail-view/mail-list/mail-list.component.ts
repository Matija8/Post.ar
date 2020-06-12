import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable/Selectable';
import { TagDataSet } from 'src/app/models/TagData/TagDataSet';
import { TagData } from 'src/app/models/TagData/TagData';
import { Subscription } from 'rxjs';
import { Folder } from 'src/app/models/Folder';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent extends Selectable implements OnInit, OnDestroy {
  @Input() folder: Folder<Message>;
  private folderSub: Subscription = null;
  public messages: Message[];

  constructor(
    private tagMail: TagMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.folderSub = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.messages = messages;
      }
    );
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    if (this.folderSub !== null) {
      this.folderSub.unsubscribe();
      this.folderSub = null;
    }
  }

  selectedChar(): string {
    return super.selectedChar(this.messages);
  }

  onStar([message, starred]: [TagData, boolean]): void {
    this.tagMail.star([message], starred);
  }

  onDelete(message: TagData): void {
    this.trashMail.moveToTrash([message]);
    this.selected.delete(message);
  }

  batchDelete(): void {
    this.trashMail.moveToTrash(this.selected.values());
    this.selected.clear();
  }

  batchStar(star: boolean): void {
    this.tagMail.star(this.selected.values(), star);
    this.selected.clear();
    this.folder.refreshFolder();
  }
}
