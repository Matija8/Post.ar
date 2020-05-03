import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message, msgType } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit, OnDestroy {
  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();
  @Output() deleteEmitter = new EventEmitter<void>();
  @Input() messagesList: Message[];
  private selected: Set<string>;

  constructor(private tagMail: TagMailService) {}

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

  onDelete([messageId, type, deleted]: [string, string, boolean]): void {
    this.tagMail.moveToTrash(messageId, type, deleted);
    this.deleteEmitter.emit();
  }
}
