import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit, OnDestroy {
  @Output() refresh = new EventEmitter<void>();
  @Input() messagesList: Message[];
  private selected: Set<string>;

  constructor() {}

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

}
