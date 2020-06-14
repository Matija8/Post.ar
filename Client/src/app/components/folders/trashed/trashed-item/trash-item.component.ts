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
  public sentByMe: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
  }

  selectToggle() {
    this.selectEmitter.emit([makeTagData(this.msg), !this.selected]);
  }

  deleteForever(event: MouseEvent) {
    event.stopPropagation();
    this.deleteForeverEmitter.emit(makeTagData(this.msg));
  }

  restore(event: MouseEvent) {
    event.stopPropagation();
    this.restoreEmitter.emit(makeTagData(this.msg));
  }

}
