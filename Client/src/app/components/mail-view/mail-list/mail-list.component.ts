import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message, sortByTime } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable, selectFilter } from 'src/app/models/Selectable/Selectable';
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
  @Input() emptyFolderTipText: string;
  private folderSub: Subscription = null;
  public messages: Message[];

  constructor(
    private tagMail: TagMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.selected = new TagDataSet();
    this.folderSub = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.messages = messages ? messages.sort(sortByTime) : [];
        this.selected = this.refreshSelectedSet(this.selected, messages);
      }
    );
    this.selected = new TagDataSet();
  }

  public ngOnDestroy(): void {
    if (this.folderSub !== null) {
      this.folderSub.unsubscribe();
      this.folderSub = null;
    }
  }

  public selectedChar(): string {
    return super.selectedChar(this.messages);
  }

  public onStar([message, starred]: [TagData, boolean]): void {
    this.tagMail.star([message], starred);
  }

  public onDelete(message: TagData): void {
    this.trashMail.moveToTrash([message]);
    this.selected.delete(message);
  }

  public onRead([messageId, markAsRead]: [string, boolean]): void {
    if (markAsRead) {
      this.tagMail.markAsRead([messageId]);
    } else {
      this.tagMail.markAsUnread([messageId]);
    }
  }

  public deleteSelected(): void {
    this.trashMail.moveToTrash(this.selected.values());
    this.selected.clear();
  }

  public starSelected(star: boolean): void {
    this.tagMail.star(this.selected.values(), star);
    this.selected.clear();
  }

  public selectByFilter(filter: selectFilter) {
    this.selected = super.filterMessages(this.messages, filter);
  }

  toggleAllSelected() {
    if (this.selected.size > 0) {
      this.selected.clear();
    } else {
      this.selectByFilter('all');
    }
  }

}
