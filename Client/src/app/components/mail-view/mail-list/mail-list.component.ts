import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/Messages';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {

  @Input() messagesList: Message[];
  constructor() { }

  ngOnInit(): void {
  }

}
