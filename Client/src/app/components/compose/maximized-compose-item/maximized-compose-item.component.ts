import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorData } from 'src/app/models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';

@Component({
  selector: 'postar-maximized-compose-item',
  templateUrl: './maximized-compose-item.component.html',
  styleUrls: ['./maximized-compose-item.component.css']
})
export class MaximizedComposeItemComponent implements OnInit {
  @Input() editorData: EditorData;
  @Output() unMaximize = new EventEmitter<void>();
  @Output() closeMaximized = new EventEmitter<boolean>();

  constructor(private sendMail: SendMailService) {}

  ngOnInit(): void {
  }

  clickSend(): void {
    this.sendMail.send(this.editorData.msg);
    this.closeMaximized.emit(false);
    // Emitted bool = whether to save as a draft or not.
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
    this.closeMaximized.emit(true);
  }

  sendBtnDisabled(): boolean {
    return !this.sendMail.validMessage(this.editorData.msg);
  }

}
