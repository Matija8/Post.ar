import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message, TagData, TagDataSet } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent extends Selectable implements OnInit, OnDestroy {
  @Input() messagesList: Message[];
  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();

  constructor(
    private tagMail: TagMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    this.selected = null;
  }

  selectedChar(): string {
    return super.selectedChar(this.messagesList);
  }

  onStar([message, starred]: [TagData, boolean]): void {
    this.tagMail.star([message], starred);
    this.starredEmitter.emit();
  }

  onDelete(message: TagData): void {
    this.trashMail.moveToTrash([message]);
  }
}
