import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message, isReceived } from 'src/app/models/Messages';
import { Router } from '@angular/router';
import { makeTagData, TagData } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-trash-item',
  templateUrl: './trash-item.component.html',
  styleUrls: ['./trash-item.component.css']
})
export class TrashItemComponent implements OnInit {
  @Input() msg: Message;
  @Input() selected: boolean;
  @Output() selectEmitter = new EventEmitter<[TagData, boolean]>();
  @Output() restoreEmitter = new EventEmitter<TagData>();
  @Output() deleteForeverEmitter = new EventEmitter<TagData>();
  public sentByMe = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
  }

  selectToggle() {
    this.selectEmitter.emit([makeTagData(this.msg), !this.selected]);
  }

  deleteForever() {
    this.deleteForeverEmitter.emit(makeTagData(this.msg));
  }

  restore() {
    this.restoreEmitter.emit(makeTagData(this.msg));
  }

  bodyClick(): void {
    // TODO: Disable click for messages in trash?
    // At least make a new open-mail-item component for trash items.
    this.router.navigate([this.router.url, this.msg.messageId]);
  }

}
