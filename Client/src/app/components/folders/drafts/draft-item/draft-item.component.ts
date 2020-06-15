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

  OpenCompose() {
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

}
