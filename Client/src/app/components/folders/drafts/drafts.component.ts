import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { Draft } from 'src/app/models/Draft';
import { DraftMailService } from 'src/app/services/mail-services/draft-mail.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'postar-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit, OnDestroy {

  public draftsList: Draft[];

  private folder = this.getMail.folders.drafts;
  protected selected: Set<string>;
  private subscription: Subscription = null;

  constructor(
    private getMail: GetMailService,
    private draftService: DraftMailService,
  ) {}

  ngOnInit(): void {
    this.selected = new Set<string>();
    this.subscription = this.folder.contents.subscribe(
      (newDrafts: Draft[]): void => {
        this.draftsList = newDrafts;
        if (this.selected) {
          this.selected.clear();
        }
      },
      (error: any): void => {
        console.log('Error during drafts subscription: ', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.selected = null;
  }

  onSelect([draftId, add]: [string, boolean]): void {
    if (add) {
      this.selected.add(draftId);
    } else {
      this.selected.delete(draftId);
    }
  }

  selectedChar(): string {
    const numOfMsgItems = this.draftsList ? this.draftsList.length : 0;
    if (this.selected.size === 0) {
      return 'None';
    }
    if (this.selected.size >= numOfMsgItems) {
      return 'All';
    }
    return 'Some';
  }

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

  onDelete(draftId: string): void {
    this.draftService.discardDraft(draftId)
    .pipe(take(1))
    .subscribe(
      res => {
        this.draftsList = this.draftsList.filter(draft => draft.messageId !== draftId);
        this.selected.delete(draftId);
      },
      err => this.folder.refreshFolder()
    );
  }

  batchDelete() {
    console.log('Batch delete!');
    const response = this.draftService.discardDrafts([...this.selected.values()]);
    response.pipe(take(1))
    .subscribe(
      (res) => {
        this.folder.refreshFolder();
      },
      (err) => {
        this.folder.refreshFolder();
      }
    );
  }

}
