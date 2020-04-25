import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EditorData, EditorMessage } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';


@Component({
  selector: 'postar-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit, OnDestroy {

  @Input() signalFromParent: Observable<void>;
  private signalSubscription: Subscription = null;

  private MAX_OPEN = 3;
  private open = 0;
  private lastId = 0;
  public openEditors = new Map<number, EditorData>();

  constructor(private sendMail: SendMailService) {}

  ngOnInit(): void {
    this.signalSubscription = this.signalFromParent.subscribe(() => {
      this.addEditor();
    });
  }

  ngOnDestroy(): void {
    if (this.signalSubscription !== null) {
      this.signalSubscription.unsubscribe();
      this.signalSubscription = null;
    }
  }

  addEditor(): void {
    if (this.open >= this.MAX_OPEN) {
      return;
    }
    this.open++;
    this.openEditors.set(this.lastId++, {
      msg: {  to: '', cc: '', bcc: '', subject: '', messageText: ''},
      size: 'normal'
    } );
  }

  closeEditor(id: number): void {
    if (this.open <= 0) {
      return;
    }
    this.openEditors.delete(id);
    this.open--;
    // if msg,to... != '' => save as a draft
    if (this.open === 0) {
      this.lastId = 0;
    }
  }

  onSend(message: EditorMessage): void {
    this.sendMail.send(message);
  }

}
