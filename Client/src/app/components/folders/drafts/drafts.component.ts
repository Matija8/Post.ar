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
  private selected: Set<string>;
  private subscription: Subscription = null;

  constructor(
    private getMail: GetMailService,
    private draftService: DraftMailService,
  ) {}

  public ngOnInit(): void {
    this.selected = new Set<string>();
    this.subscription = this.folder.contents.subscribe(
      (newDrafts: Draft[]): void => {
        this.draftsList = newDrafts;
        this.selected = this.refreshSelectedSet(this.selected, this.draftsList);
      },
      (error: any): void => {
        console.log('Error during drafts subscription: ', error);
        this.selected = this.refreshSelectedSet(this.selected, this.draftsList);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private refreshSelectedSet(selected: Set<string>, draftsList: Draft[]): Set<string> {
    // Returns new set with deleted ids removed.
    const newSelected = new Set<string>();
    if (!selected) {
      return newSelected;
    }
    const draftIds = draftsList.map(draft => draft.messageId);
    for (const id of draftIds) {
      if (selected.has(id)) {
        newSelected.add(id);
      }
    }
    return newSelected;
  }

  public itemIsSelected(draft: Draft): boolean {
    return this.selected.has(draft.messageId);
  }

  public onSelect([draftId, add]: [string, boolean]): void {
    if (add) {
      this.selected.add(draftId);
    } else {
      this.selected.delete(draftId);
    }
  }

  public selectedChar(): string {
    const draftSize = this.draftsList ? this.draftsList.length : 0;
    const selectedSize = this.selected ? this.selected.size : 0;
    if (selectedSize === 0) {
      return 'None';
    }
    if (selectedSize >= draftSize) {
      return 'All';
    }
    return 'Some';
  }

  public refreshFolder(): void {
    this.folder.refreshFolder();
  }

  public onDelete(draftId: string): void {
    this.draftService.discardDraft(draftId);
  }

  public deleteSelected(): void {
    this.draftService.discardDrafts([...this.selected.values()]);
  }

}
