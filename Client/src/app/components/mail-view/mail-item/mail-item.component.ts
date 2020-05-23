import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived, TagData, makeTagData } from 'src/app/models/Messages';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  @Output() starEmitter = new EventEmitter<[TagData, boolean]>();
  @Output() moveToTrashEmitter = new EventEmitter<TagData>();
  public sentByMe: boolean;
  public isSelected: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  star(): void {
    this.msg.isStarred = !this.msg.isStarred;
    this.starEmitter.emit([makeTagData(this.msg), this.msg.isStarred]);
  }

  selectToggle() {
    this.isSelected = !this.isSelected;
    this.selectEmitter.emit([this.msg.message_id, this.isSelected]);
  }

  moveToTrash(event: MouseEvent) {
    event.stopPropagation();
    this.moveToTrashEmitter.emit(makeTagData(this.msg));
  }
}
