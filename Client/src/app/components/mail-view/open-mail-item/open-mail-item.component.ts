import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Message } from '../../../models/Messages';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Folder } from 'src/app/models/Folder';

@Component({
  selector: 'postar-open-mail-item',
  templateUrl: './open-mail-item.component.html',
  styleUrls: ['./open-mail-item.component.css']
})
export class OpenMailItemComponent implements OnInit, OnDestroy {

  public msg: Message;
  private folderName: string;
  private folder: Folder;
  private routeSub: Subscription = null;
  private folderSub: Subscription = null;

  constructor(
    private getMail: GetMailService,
    private route: ActivatedRoute,
    private router: Router,
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
            console.log('Naslov: ', this.msg.subject);
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

  }

}
