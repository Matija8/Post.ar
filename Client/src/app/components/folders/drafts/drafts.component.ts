import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Draft } from 'src/app/models/Compose';
import { Subscription } from 'rxjs';
import { TagDataSet } from 'src/app/models/Messages';
import { Selectable } from 'src/app/models/Selectable';

@Component({
  selector: 'postar-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent extends Selectable implements OnInit, OnDestroy {

  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();

  public draftsList: Draft[];

  private folder = this.getMail.folders.drafts;
  private subscription: Subscription = null;

  constructor(
    private getMail: GetMailService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.folder.contents.subscribe(
      (newDrafts: Draft[]): void => {
        this.draftsList = newDrafts;
      },
      (error: any): void => {
        console.log('Error during drafts subscription: ', error);
      }
    );
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.selected = null;
  }

  selectedChar(): string {
    return super.selectedChar(this.draftsList);
  }

  refreshFolder(): void {
    console.log('Refreshing drafts!');
  }

}
