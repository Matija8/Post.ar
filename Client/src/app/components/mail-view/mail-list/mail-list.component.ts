import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/Messages';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {
  @Output() refresh = new EventEmitter<void>();
  @Input() messagesList: Message[];

  constructor() {}

  ngOnInit(): void {
  }

}
