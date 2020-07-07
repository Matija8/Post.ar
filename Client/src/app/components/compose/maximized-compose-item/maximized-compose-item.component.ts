import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorData, makeEmptyEditorMsg } from 'src/app/models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';

@Component({
  selector: 'postar-maximized-compose-item',
  templateUrl: './maximized-compose-item.component.html',
  styleUrls: ['./maximized-compose-item.component.css']
})
export class MaximizedComposeItemComponent implements OnInit {
  @Input() editorData: EditorData;
  @Output() unMaximize = new EventEmitter<void>();
  @Output() closeMaximized = new EventEmitter<void>();

  constructor(private sendMail: SendMailService) {}

  ngOnInit(): void {
  }

  clickSend(): void {
    this.sendMail.send(this.editorData.msg);
    // Delete this editor or just make it empty?
    // this.editorData.msg = makeEmptyEditorMsg();
    this.closeMaximized.emit();
  }

  unMaximizeClick(): void {
    this.editorData.size = 'normal';
    this.unMaximize.emit();
  }

  minimize(): void {
    this.editorData.size = 'minimized';
    this.unMaximize.emit();
  }

  closeClick(): void {
    this.closeMaximized.emit();
  }

  sendBtnDisabled(): boolean {
    return this.sendMail.validMessage(this.editorData.msg);
  }

}
