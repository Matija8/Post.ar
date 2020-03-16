import { Component, OnInit, Input} from '@angular/core';
import { Message, isReceived, isSent } from 'src/app/models/Messages';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  sentByMe = false;
  // napraviti enum
  constructor() { }

  ngOnInit(): void {
    this.checkMsg();
  }

  checkMsg() {
    if (isReceived(this.msg)) {
      this.sentByMe = false;
      return;
    } else if (isSent(this.msg)) {
      this.sentByMe = true;
      return;
    }
  }
}
