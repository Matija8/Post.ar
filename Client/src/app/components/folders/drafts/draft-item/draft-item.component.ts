import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Draft, toEditorMessage } from 'src/app/models/Draft';
import { OpenComposeService } from 'src/app/services/ui-services/open-compose.service';

@Component({
  selector: 'postar-draft-item',
  templateUrl: './draft-item.component.html',
  styleUrls: ['./draft-item.component.css']
})
export class DraftItemComponent implements OnInit {
  @Input() draft: Draft;
  @Input() selected: boolean;
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  @Output() deleteEmitter = new EventEmitter<string>();

  constructor(
    public router: Router,
    private openComposeService: OpenComposeService,
  ) {}

  ngOnInit(): void {
  }

  openCompose() {
    this.deleteEmitter.emit(this.draft.messageId);
    this.openComposeService.addEditor({
      msg: toEditorMessage(this.draft),
      size: 'normal',
    });
  }

  selectToggle() {
    this.selectEmitter.emit([this.draft.messageId, !this.selected]);
  }

  deleteDraft() {
    this.deleteEmitter.emit(this.draft.messageId);
  }

  draftTitleSubject(): string {
    const MAX_SUBJ_LEN = 30;
    const subject = this.draft.subject;
    if (!subject) {
      return '(no subject)';
    }
    if (subject.length > MAX_SUBJ_LEN) {
      return subject.substr(0, MAX_SUBJ_LEN - 3) + '...';
    }
    return subject;
  }

  draftTitleRecepient(): string {
    const MAX_RECP_LEN = 30;
    const recepient = this.draft.to;
    if (!recepient) {
      return '';
    }
    if (recepient.length > MAX_RECP_LEN) {
      return recepient.substr(0, MAX_RECP_LEN - 3) + '...';
    }
    return recepient;
  }


}
