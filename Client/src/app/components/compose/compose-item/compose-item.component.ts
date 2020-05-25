import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { editorSize, EditorMessage, EditorData, makeEmptyEditorMsg } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';


@Component({
  selector: 'postar-compose-item',
  templateUrl: './compose-item.component.html',
  styleUrls: ['./compose-item.component.css']
})
export class ComposeItemComponent implements OnInit {


  @Input() index: number;
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
    this.editorData.msg = makeEmptyEditorMsg();
  }

  sendBtnDisabled() {
    const msg = this.editorData.msg;
    if (msg.subject && msg.messageText && this.sendMail.validTo(msg.to)) {
      return false;
    }
    return true;
  }

  closeClick() {
    this.closeEvent.emit(this.index);
    // console.log(`closing: ${this.index}`);
  }

  changeSize(newSize: editorSize) {
    this.editorData.size = newSize;
  }

  public headerText(): string {
    const MAX_HEADER_LENGTH = 12;
    const text = this.editorData.msg.subject.trim();
    if (!text) {
      return 'New Message';
    }
    return (
      text.length <= MAX_HEADER_LENGTH ?
      text :
      (text.substring(0, MAX_HEADER_LENGTH) + '...')
    );
  }

}
