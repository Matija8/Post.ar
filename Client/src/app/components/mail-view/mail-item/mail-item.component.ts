import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived, TagData, makeTagData } from 'src/app/models/Messages';
import { Router } from '@angular/router';
import { SelectableItem } from 'src/app/models/SelectableItem';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent extends SelectableItem implements OnInit {

  @Input() msg: Message;
  @Output() starEmitter = new EventEmitter<[TagData, boolean]>();
  @Output() moveToTrashEmitter = new EventEmitter<TagData>();
  public sentByMe: boolean;
  public isSelected: boolean;

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  star(): void {
    this.msg.isStarred = !this.msg.isStarred;
    this.starEmitter.emit([makeTagData(this.msg), this.msg.isStarred]);
  }

  selectToggle() {
    super.selectToggle(makeTagData(this.msg));
  }

  moveToTrash(event: MouseEvent) {
    event.stopPropagation();
    this.moveToTrashEmitter.emit(makeTagData(this.msg));
  }
}
