import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Draft } from 'src/app/models/Compose';
import { Subscription } from 'rxjs';
import { TagData, TagDataSet } from 'src/app/models/Messages';
import { MailListComponent } from 'src/app/components/mail-view/mail-list/mail-list.component';

@Component({
  selector: 'postar-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit, OnDestroy {

  @Output() refresh = new EventEmitter<void>();
  @Output() starredEmitter = new EventEmitter<void>();

  public draftsList: Draft[];

  private folder = this.getMail.folders.drafts;
  private subscription: Subscription = null;
  private selected: TagDataSet;

  constructor(
    private getMail: GetMailService,
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
    this.selected = new TagDataSet();
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.selected = null;
  }

  onSelect([message, add]: [TagData, boolean]): void {
    if (add) {
      this.selected.add(message);
    } else {
      this.selected.delete(message);
    }
  }

  selectedChar(): string {
    // TODO: izvuci select logiku!
    return MailListComponent.prototype.selectedChar.bind(this)();
  }

  refreshFolder(): void {
    console.log('Refreshing drafts!');
  }

}
