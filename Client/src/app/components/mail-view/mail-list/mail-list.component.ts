import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { TagMailService } from 'src/app/services/mail-services/tag-mail.service';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { Selectable } from 'src/app/models/Selectable/Selectable';
import { TagDataSet } from 'src/app/models/TagData/TagDataSet';
import { TagData } from 'src/app/models/TagData/TagData';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'postar-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent extends Selectable implements OnInit, OnDestroy {
  @Input() messagesList: Message[];
  @Input() clearSelectedSubject: Subject<void>;
  private clearSelectedSub: Subscription = null;
  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();

  constructor(
    private tagMail: TagMailService,
    private trashMail: TrashMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.clearSelectedSubject) {
      this.clearSelectedSub = this.clearSelectedSubject.subscribe(
        () => this.selected.clear()
      );
    }
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    this.selected = null;
    if (this.clearSelectedSub !== null) {
      this.clearSelectedSub.unsubscribe();
      this.clearSelectedSub = null;
    }
  }

  selectedChar(): string {
    return super.selectedChar(this.messagesList);
  }

  onStar([message, starred]: [TagData, boolean]): void {
    this.tagMail.star([message], starred);
    this.starredEmitter.emit();
  }

  onDelete(message: TagData): void {
    this.trashMail.moveToTrash([message]);
    this.selected.delete(message);
  }

  batchDelete(): void {
    this.trashMail.moveToTrash(this.selected.values());
    this.selected.clear();
  }

  batchStar(star: boolean): void {
    this.tagMail.star(this.selected.values(), star);
    this.selected.clear();
    this.refresh.emit();
  }
}
