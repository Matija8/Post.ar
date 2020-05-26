import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Draft } from 'src/app/models/Draft';
import { SelectableItem } from 'src/app/models/Selectable/SelectableItem';
import { msgType } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-draft-item',
  templateUrl: './draft-item.component.html',
  styleUrls: ['./draft-item.component.css']
})
export class DraftItemComponent extends SelectableItem implements OnInit {
  @Input() draft: Draft;

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  OpenCompose() {
    console.log('TODO: open compose item...');
    // TODO
  }

  selectToggle() {
    console.log('TODO: implement select logic for drafts...');
    // super.selectToggle({ messageId: this.draft.messageId, type: 'draft' });
  }

}
