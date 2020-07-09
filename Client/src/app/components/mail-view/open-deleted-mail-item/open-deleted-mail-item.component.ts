import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/Messages';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';
import { makeTagData } from 'src/app/models/TagData/TagData';

@Component({
  selector: 'postar-open-deleted-mail-item',
  templateUrl: './open-deleted-mail-item.component.html',
  styleUrls: ['./open-deleted-mail-item.component.css']
})
export class OpenDeletedMailItemComponent implements OnInit, OnDestroy {

  public msg: Message;
  private sub: Subscription = null;

  constructor(
    private getMail: GetMailService,
    private route: ActivatedRoute,
    private router: Router,
    private trashMail: TrashMailService,
  ) {
    const trashContents = this.getMail.folders.trash.contents;
    this.sub = combineLatest([
      this.route.paramMap,
      trashContents
    ]).pipe(
      map(([paramMap, messages]): Message => {
        const msgId = paramMap.get('msgId');
        if (!msgId) {
          return undefined;
        }
        const msg = messages.find(message => message.messageId === msgId);
        return msg;
      })
    ).subscribe(
      (msg: Message) => {
        if (!msg) {
          this.router.navigate(['/trash']);
        }
        this.msg = msg;
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  restore(): void {
    this.router.navigate(['/trash']);
    this.trashMail.restoreFromTrash([makeTagData(this.msg)]);
  }

  deleteForever(): void {
    this.router.navigate(['/trash']);
    this.trashMail.deleteForever([makeTagData(this.msg)]);
  }

}
