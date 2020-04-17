import { Component, OnInit } from '@angular/core';
import { SMessage } from 'src/app/models/Messages';
import { GetMailService } from '../../services/mail-services/get-mail.service';

@Component({
  selector: 'postar-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  sentMessages: SMessage[];
  constructor(private getMail: GetMailService) {}

  ngOnInit(): void {
    this.sentMessages = this.getMail.getSentMessages();
  }

}
