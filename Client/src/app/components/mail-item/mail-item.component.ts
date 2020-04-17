import { Component, OnInit, Input} from '@angular/core';
import { Message, isReceived, isSent } from 'src/app/models/Messages';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  sentByMe = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !(isReceived(this.msg));
  }
}
