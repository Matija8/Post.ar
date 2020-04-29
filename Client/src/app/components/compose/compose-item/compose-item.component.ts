import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { editorSize, EditorMessage, EditorData } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';


@Component({
  selector: 'postar-compose-item',
  templateUrl: './compose-item.component.html',
  styleUrls: ['./compose-item.component.css']
})
export class ComposeItemComponent implements OnInit {


  @Input() id: number;
  @Input() editorData: EditorData;

  @Output() closeEvent = new EventEmitter<number>();
  @Output() send = new EventEmitter<EditorMessage>();

  constructor(private sendMail: SendMailService) { }

  ngOnInit(): void {
  }

  clickSend(): void {
    const msg = this.editorData.msg;
    console.log(`
      send clicked:
      to = ${msg.to}
      subject = ${msg.subject}
      msg = ${msg.messageText}`);

    this.send.emit(msg);
    this.editorData.msg = {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      messageText: ''
    };
  }

  sendBtnDisabled() {
    const msg = this.editorData.msg;
    if (msg.subject && msg.messageText && this.sendMail.validTo(msg.to)) {
      return false;
    }
    return true;
  }

  closeClick() {
    this.closeEvent.emit(this.id);
  }

  changeSize(newSize: editorSize) {
    this.editorData.size = newSize;
  }

}
