import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
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
  // starredEmitter -> use to notify starred component to soft refresh. TODO: different solution?
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

  onStar([messageId, type, starred]: [string, string, boolean]): void {
    this.tagMail.star(messageId, starred, type);
    this.starredEmitter.emit();
  }

  onDelete([messageId, type]: [string, string]): void {
    this.trashMail.moveToTrash(messageId, type);
  }
}
