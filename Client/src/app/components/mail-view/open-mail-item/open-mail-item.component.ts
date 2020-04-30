import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Message } from '../../../models/Messages';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'postar-open-mail-item',
  templateUrl: './open-mail-item.component.html',
  styleUrls: ['./open-mail-item.component.css']
})
export class OpenMailItemComponent implements OnInit, OnDestroy {

  public msg: Message;
  private msgId: string;
  private folderName: string;
  private paramMapSubscription: Subscription = null;
  private folderSubscription: Subscription = null;

  constructor(private getMail: GetMailService , private route: ActivatedRoute, private router: Router) {
    this.paramMapSubscription = this.route.paramMap.subscribe(params => {
      this.msgId = params.get('msgId');
      this.folderName = params.get('folder');
      const folder = this.getMail.folders[this.folderName];
      if (!folder) {
        router.navigate(['inbox']);
      }
      if (this.folderSubscription !== null) {
        this.folderSubscription.unsubscribe();
      }
      this.folderSubscription = folder.contents.pipe(
        map(messages => messages.find(message => message.message_id === this.msgId))
      ).subscribe(
        message => {
          if (!message) {
            router.navigate(['inbox']);
          }
          this.msg = message;
        }
      );
    });
  }

  ngOnInit(): void {
    if (!this.msg) {
      this.router.navigate(['inbox']);
    }
  }

  ngOnDestroy(): void {
    if (this.paramMapSubscription !== null) {
      this.paramMapSubscription.unsubscribe();
      this.paramMapSubscription = null;
    }
    if (this.folderSubscription !== null) {
      this.folderSubscription.unsubscribe();
      this.folderSubscription = null;
    }
  }

}
