import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { Draft } from 'src/app/models/Draft';
import { DraftMailService } from 'src/app/services/mail-services/draft-mail.service';

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
    this.subscription = this.folder.contents.subscribe(
      (newDrafts: Draft[]): void => {
        this.draftsList = newDrafts;
      },
      (error: any): void => {
        console.log('Error during drafts subscription: ', error);
      }
    );
    this.selected = new Set<string>();
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
    console.log('Refreshing drafts!');
  }

  onDelete(draftId: string): void {
    this.draftService.discardDraft(draftId);
  }

}
