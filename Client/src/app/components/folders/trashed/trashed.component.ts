import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Subscription } from 'rxjs';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';

@Component({
  selector: 'postar-trash',
  templateUrl: './trashed.component.html',
  styleUrls: ['./trashed.component.css']
})
export class TrashedComponent implements OnInit, OnDestroy {
  private folder = this.getMail.folders.trash;
  private subscription: Subscription = null;
  private selected: Set<string>;

  public trashedMessages: Message[];

  constructor(
    private getMail: GetMailService,
    private trashMail: TrashMailService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.folder.contents.subscribe(
      (messages: Message[]): void => {
        this.trashedMessages = messages;
      },
      (error: any): void => {
        console.log('Error during trashed subscription: ', error);
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

  refreshFolder(): void {
    this.folder.refreshFolder();
  }

  selectedChar(): string {
    if (this.selected.size === 0) {
      return 'None';
    }
    if (this.selected.size === this.trashedMessages.length) {
      return 'All';
    }
    return 'Some';
  }

  onSelect([messageId, add]: [string, boolean]): void {
    if (add) {
      this.selected.add(messageId);
    } else {
      this.selected.delete(messageId);
    }
  }

  clearSelected(): void {
    this.selected.clear();
  }

  onDeleteForever([messageId, type]: [string, string]): void {
    // TODO
    console.log('Trashed component.ts: onDeleteForever (TODO)');
    this.trashMail.deleteForever(undefined, undefined);
  }

  onRestore(): void {
    // TODO
    console.log('Trashed component.ts: onRestore (TODO)');
    this.trashMail.restoreFromTrash(undefined, undefined);
  }

}
