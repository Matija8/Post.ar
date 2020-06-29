import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived } from 'src/app/models/Messages';
import { Router } from '@angular/router';
import { TagData, makeTagData } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  @Input() selected: boolean;
  @Output() starEmitter = new EventEmitter<[TagData, boolean]>();
  @Output() moveToTrashEmitter = new EventEmitter<TagData>();
  @Output() selectEmitter = new EventEmitter<[TagData, boolean]>();
  @Output() markReadEmitter = new EventEmitter<[string, boolean]>();
  public sentByMe = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
  }

  star(): void {
    this.starEmitter.emit([makeTagData(this.msg), !this.msg.isStarred]);
  }

  selectToggle() {
    this.selectEmitter.emit([makeTagData(this.msg), !this.selected]);
  }

  moveToTrash() {
    this.moveToTrashEmitter.emit(makeTagData(this.msg));
  }

  toggleRead() {
    // Only inbox messages have the isRead attribute.
    this.markReadEmitter.emit([(this.msg.messageId), !this.msg.isRead]);
  }

  bodyClick() {
    if (!this.msg.isRead && !this.sentByMe) {
      this.markReadEmitter.emit([(this.msg.messageId), !this.msg.isRead]);
    }
    this.router.navigate([this.router.url, this.msg.messageId]);
  }
}
