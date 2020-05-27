import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived } from 'src/app/models/Messages';
import { Router } from '@angular/router';
import { SelectableItem } from 'src/app/models/Selectable/SelectableItem';
import { TagData, makeTagData } from 'src/app/models/TagData/TagData';

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
  public isStarred: boolean;

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isStarred = false;
  }

  star(): void {
    this.msg.isStarred = !this.msg.isStarred;
    this.isStarred = !this.isStarred;
    console.log(this.isStarred);
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
