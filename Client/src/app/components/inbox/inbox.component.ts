import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/Messages';
@Component({
  selector: 'postar-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  inboxMessages: Message[];
  constructor() { }

  ngOnInit(): void {
    this.inboxMessages = [
      {
        id: 1,
        sender: 'Matija',
        cc: 'Angular',
        messageText: 'Neka veeeeelika poruka'
      },
      {
        id: 2,
        sender: 'Stefan',
        cc: 'Angular1',
        messageText: 'jos neka velika poruka'
      }
    ];
  }
}
