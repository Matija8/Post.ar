import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Message } from '../../../models/Messages';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Folder } from 'src/app/models/Folder';
import { OpenComposeService } from 'src/app/services/ui-services/open-compose.service';
import { EditorMessage, EditorData } from 'src/app/models/Compose';
import { TagData, makeTagData } from 'src/app/models/TagData/TagData';
import { TrashMailService } from 'src/app/services/mail-services/trash-mail.service';

@Component({
  selector: 'postar-open-mail-item',
  templateUrl: './open-mail-item.component.html',
  styleUrls: ['./open-mail-item.component.css']
})
export class OpenMailItemComponent implements OnInit, OnDestroy {

  public msg: Message;
  private folderName: string;
  private folder: Folder<Message>;
  private routeSub: Subscription = null;
  private folderSub: Subscription = null;

  constructor(
    private getMail: GetMailService,
    private route: ActivatedRoute,
    private router: Router,
    private openCompose: OpenComposeService,
    private trashService: TrashMailService
  ) {
    this.routeSub = combineLatest([
      this.route.data,
      this.route.paramMap
    ])
    .pipe(
      map(([routeData, paramMap]) => [routeData.folderName, paramMap.get('msgId')])
    )
    .subscribe(
      ([folderName, msgId]: [string, string]) => {
        if (!folderName) {
          this.router.navigate(['/inbox']);
          return;
        }
        if (folderName !== this.folderName) {
          const folder = this.getMail.folders[folderName];
          if (!folder) {
            this.router.navigate(['/inbox']);
            return;
          }
          this.folderName = folderName;
          this.folder = folder;
        }
        if (!msgId) {
          this.router.navigate([this.folderName]);
          return;
        }
        if (this.folderSub !== null) {
          this.folderSub.unsubscribe();
        }
        this.folderSub = this.folder.contents.pipe(
          map(messages => messages.find(message => message.messageId === msgId))
        ).subscribe(
          message => {
            if (!message) {
              router.navigate(['/inbox']);
              return;
            }
            this.msg = message;
          }
        );

      }
    );
  }

  ngOnInit(): void {
    if (!this.msg) {
      if (this.folder && this.folderName) {
        this.router.navigate([this.folderName]);
      } else {
        this.router.navigate(['/inbox']);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub !== null) {
      this.routeSub.unsubscribe();
      this.routeSub = null;
    }
    if (this.folderSub !== null) {
      this.folderSub.unsubscribe();
      this.folderSub = null;
    }
  }

  onReply(): void {
    console.log(this.msg.from);
    const replyTo = this.msg.from;
    const replySubject: string = 'Re: ' + this.msg.subject;
    const replyContent: string = '\n\n' + '<' + this.msg.content + '>';

    const replyMessage: EditorMessage = {
      to: replyTo,
      subject: replySubject,
      messageText: replyContent
    };

    const replyEditorData: EditorData = {
      msg: replyMessage,
      size: 'minimized'
    };

    this.openCompose.addEditor(replyEditorData);
  }

  onDelete(): void {
    const array: TagData[] = [];
    const tagData = makeTagData(this.msg);
    array.push(tagData);
    this.trashService.moveToTrash(array);
  }

}
