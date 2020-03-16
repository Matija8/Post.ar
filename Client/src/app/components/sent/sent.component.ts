import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Messages';

@Component({
  selector: 'postar-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  sentMessages: Message[];
  constructor() { }

  ngOnInit(): void {
    this.sentMessages = [
      {
        id: 1,
        sentTo: 'Pera',
        cc: 'Angular',
        messageText: 'Neka veeeeelika poruka'
      },
      {
        id: 2,
        sentTo: 'Luka',
        cc: 'Angular1',
        messageText: 'jos neka velika poruka'
      }
    ];
  }
}
