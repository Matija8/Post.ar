import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message, TagData } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit, OnDestroy {
  @Input() messagesList: Message[];
  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();
  private selected: Set<string>;

  constructor(
    private tagMail: TagMailService,
    private trashMail: TrashMailService,
  ) {}

  ngOnInit(): void {
    this.selected = new Set<string>();
  }

  ngOnDestroy(): void {
    this.selected = null;
  }

  onSelect([messageId, add]: [string, boolean]): void {
    if (add) {
      this.selected.add(messageId);
    } else {
      this.selected.delete(messageId);
    }
  }

  selectedChar(): string {
    if (this.selected.size === 0) {
      return 'None';
    }
    if (this.selected.size === this.messagesList.length) {
      return 'All';
    }
    return 'Some';
  }

  clearSelected(): void {
    this.selected.clear();
  }

  onStar([message, starred]: [TagData, boolean]): void {
    this.tagMail.star([message], starred);
    this.starredEmitter.emit();
  }

  onDelete(message: TagData): void {
    this.trashMail.moveToTrash([message]);
  }
}
