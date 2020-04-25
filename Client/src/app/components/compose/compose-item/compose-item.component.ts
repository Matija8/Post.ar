import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { editorSize, EditorMessage, EditorData } from '../../../models/Compose';


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

  constructor() { }

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
  }

  closeClick() {
    this.closeEvent.emit(this.id);
  }

  changeSize(newSize: editorSize) {
    this.editorData.size = newSize;
  }

}
