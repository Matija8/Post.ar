import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message, isReceived, msgType, TagData, makeTagData } from 'src/app/models/Messages';
import { Router } from '@angular/router';
import { SelectableItem } from 'src/app/models/SelectableItem';

@Component({
  selector: 'postar-trashed-item',
  templateUrl: './trashed-item.component.html',
  styleUrls: ['./trashed-item.component.css']
})
export class TrashedItemComponent extends SelectableItem implements OnInit {
  @Input() msg: Message;
  @Output() restoreEmitter = new EventEmitter<[string, string]>();
  @Output() deleteForeverEmitter = new EventEmitter<[string, string]>();
  public sentByMe: boolean;

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  selectToggle() {
    super.selectToggle(makeTagData(this.msg));
  }

  deleteForever(event: MouseEvent) {
    // TODO: convert to tagData
    event.stopPropagation();
    this.deleteForeverEmitter.emit([this.msg.message_id, msgType(this.msg)]);
  }

  restore(event: MouseEvent) {
    // TODO
    event.stopPropagation();
    this.restoreEmitter.emit([this.msg.message_id, msgType(this.msg)]);
  }

}
