import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message, isReceived } from 'src/app/models/Messages';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})

export class MailItemComponent implements OnInit {

  @Input() msg: Message;
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  public sentByMe: boolean;
  public isSelected: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.sentByMe = !isReceived(this.msg);
    this.isSelected = false;
  }

  star(): void {
    console.log('star');
  }

  selectToggle() {
    this.isSelected = !this.isSelected;
    console.log(this.isSelected);
    this.selectEmitter.emit([this.msg.message_id, this.isSelected]);
  }
}
