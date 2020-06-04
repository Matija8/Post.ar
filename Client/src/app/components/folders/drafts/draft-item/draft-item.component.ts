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
  @Output() selectEmitter = new EventEmitter<[string, boolean]>();
  @Output() deleteEmitter = new EventEmitter<string>();
  public isSelected: boolean;

  constructor(
    public router: Router,
    private openComposeService: OpenComposeService,
  ) {}

  ngOnInit(): void {
    this.isSelected = false;
  }

  OpenCompose() {
    this.deleteEmitter.emit(this.draft.messageId);
    this.openComposeService.addEditor({
      msg: toEditorMessage(this.draft),
      size: 'normal',
    });
  }

  selectToggle() {
    this.isSelected = !this.isSelected;
    this.selectEmitter.emit([this.draft.messageId, this.isSelected]);
  }

  deleteDraft(event: MouseEvent) {
    event.stopPropagation();
    this.deleteEmitter.emit(this.draft.messageId);
  }

}
