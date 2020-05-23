import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EditorData, EditorMessage, makeEmptyMsg, checkEmpty } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';


@Component({
  selector: 'postar-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit, OnDestroy {

  @Input() signalFromParent: Observable<void>;
  private signalSubscription: Subscription = null;

  public readonly MAX_OPEN = 3;
  public openEditors: EditorData[] = [];

  constructor(private sendMail: SendMailService) {}

  ngOnInit(): void {
    this.signalSubscription = this.signalFromParent.subscribe(() => {
      this.addEditor(null);
    });
  }

  ngOnDestroy(): void {
    if (this.signalSubscription !== null) {
      this.signalSubscription.unsubscribe();
      this.signalSubscription = null;
    }
  }

  addEditor(msg: EditorMessage): void {
    msg = msg || makeEmptyMsg();
    this.openEditors.push({ msg, size: 'normal' });
    // console.log(`Opening: ${this.openEditors.length - 1}`);
  }

  closeEditor(index: number): void {
    if (index < 0 || index >= this.openEditors.length) {
      return;
    }
    const msg = this.openEditors[index].msg;
    if (!checkEmpty(msg)) {
      // TODO: Save as a draft.
      // console.log('Editor isn\'t empty!');
    }
    this.openEditors.splice(index, 1);
  }

  closeAllEditors(): void {
    // TODO: Save drafts?
    this.openEditors = [];
  }

  onSend(message: EditorMessage): void {
    this.sendMail.send(message);
  }

}
