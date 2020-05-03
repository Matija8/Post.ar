import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived, msgType } from 'src/app/models/Messages';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  @Output() starEmitter = new EventEmitter<[string, string, boolean]>();
  @Output() deleteEmitter = new EventEmitter<[string, string, boolean]>();
  public sentByMe: boolean;
  public isSelected: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  star(): void {
    this.msg.isStarred = !this.msg.isStarred;
    this.starEmitter.emit([this.msg.message_id, msgType(this.msg), this.msg.isStarred]);
  }

  selectToggle() {
    this.isSelected = !this.isSelected;
    this.selectEmitter.emit([this.msg.message_id, this.isSelected]);
  }

  deleteMessage(event: Event) {
    console.log('delete is clicked\n');
    event.stopPropagation();
    this.msg.isDeleted = true;
    this.deleteEmitter.emit([this.msg.message_id, msgType(this.msg), this.msg.isDeleted]);
  }
}
