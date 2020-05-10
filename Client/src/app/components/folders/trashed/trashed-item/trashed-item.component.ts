import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message, isReceived, msgType } from 'src/app/models/Messages';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-trashed-item',
  templateUrl: './trashed-item.component.html',
  styleUrls: ['./trashed-item.component.css']
})
export class TrashedItemComponent implements OnInit {
  @Input() msg: Message;
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  @Output() restoreEmitter = new EventEmitter<[string, string]>();
  @Output() deleteForeverEmitter = new EventEmitter<[string, string]>();
  public sentByMe: boolean;
  public isSelected: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  selectToggle() {
    this.isSelected = !this.isSelected;
    this.selectEmitter.emit([this.msg.message_id, this.isSelected]);
  }

  deleteForever(event: MouseEvent) {
    event.stopPropagation();
    this.deleteForeverEmitter.emit([this.msg.message_id, msgType(this.msg)]);
  }

  restore(event: MouseEvent) {
    event.stopPropagation();
    this.restoreEmitter.emit([this.msg.message_id, msgType(this.msg)]);
  }

}
