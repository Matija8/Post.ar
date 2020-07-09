import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { editorSize, EditorMessage, EditorData, makeEmptyEditorMsg } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';


@Component({
  selector: 'postar-compose-item',
  templateUrl: './compose-item.component.html',
  styleUrls: ['./compose-item.component.css']
})
export class ComposeItemComponent implements OnInit {


  @Input() editorData: EditorData;

  @Output() closeEvent = new EventEmitter<EditorData>();
  @Output() maximize = new EventEmitter<EditorData>();

  constructor(private sendMail: SendMailService) {}

  ngOnInit(): void {
  }

  clickSend(): void {
    const msg = this.editorData.msg;
    this.sendMail.send(msg);
    this.editorData.msg = makeEmptyEditorMsg();
  }

  sendBtnDisabled(): boolean {
    return !this.sendMail.validMessage(this.editorData.msg);
  }

  closeClick(): void {
    this.closeEvent.emit(this.editorData);
  }

  maximizeClick(): void {
    this.maximize.emit(this.editorData);
  }

  changeSize(newSize: editorSize): void {
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
