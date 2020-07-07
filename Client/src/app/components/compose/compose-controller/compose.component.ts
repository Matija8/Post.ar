import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditorData, EditorMessage, makeEmptyEditorMsg, checkEmpty } from '../../../models/Compose';
import { SendMailService } from 'src/app/services/mail-services/send-mail.service';
import { OpenComposeService } from 'src/app/services/ui-services/open-compose.service';
import { DraftMailService } from 'src/app/services/mail-services/draft-mail.service';


@Component({
  selector: 'postar-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit, OnDestroy {

  private signalSubscription: Subscription = null;

  public readonly MAX_OPEN = 3;
  public openEditors: EditorData[] = [];
  public maximizedEditor: { data: EditorData, index: number } = null;

  constructor(
    private sendMail: SendMailService,
    private openCompose: OpenComposeService,
    private draftMail: DraftMailService,
  ) {}

  ngOnInit(): void {
    this.signalSubscription = this.openCompose.addEditorEmitter.subscribe((newEditor: EditorData) => {
      this.addEditor(newEditor.msg);
    });
  }

  ngOnDestroy(): void {
    if (this.signalSubscription !== null) {
      this.signalSubscription.unsubscribe();
      this.signalSubscription = null;
    }
  }

  addEditor(msg: EditorMessage): void {
    msg = msg || makeEmptyEditorMsg();
    this.openEditors.push({ msg, size: 'normal' });
  }

  closeEditor(editorToClose: EditorData): void {
    const index = this.openEditors.findIndex(editor => editor === editorToClose);
    if (index === undefined) {
      return;
    }
    const msg = editorToClose.msg;
    if (!checkEmpty(msg)) {
      this.draftMail.saveDraft(msg);
    }
    this.openEditors.splice(index, 1);
    if (this.maximizedEditor !== null && this.maximizedEditor.index > index) {
      this.maximizedEditor.index--;
    }
  }

  maximizeEditor(editorToMaximize: EditorData): void {
    if (!this.openEditors.includes(editorToMaximize)) {
      return;
    }
    this.unMaximizeEditor();
    const index = this.openEditors.findIndex(editor => editor === editorToMaximize);
    this.openEditors.splice(index, 1);
    this.maximizedEditor = { data: editorToMaximize, index };
  }

  unMaximizeEditor(): void {
    if (!this.maximizedEditor) {
      return;
    }
    const { index, data } = this.maximizedEditor;
    this.openEditors.splice(index, 0, data);
    this.maximizedEditor = null;
  }

  closeMaximizedEditor(): void {
    if (!this.maximizedEditor) {
      return;
    }
    const msg = this.maximizedEditor.data.msg;
    if (!checkEmpty(msg)) {
      this.draftMail.saveDraft(msg);
    }
    this.maximizedEditor = null;
  }

  closeAllEditors(): void {
    // *Doesn't save drafts on purpose*
    this.openEditors = [];
    this.maximizedEditor = null;
  }

  onSend(message: EditorMessage): void {
    this.sendMail.send(message);
  }

}
