import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMailService } from 'src/app/services/mail-services/get-mail.service';
import { Message } from '../../../models/Messages';

@Component({
  selector: 'postar-open-mail-item',
  templateUrl: './open-mail-item.component.html',
  styleUrls: ['./open-mail-item.component.css']
})
export class OpenMailItemComponent implements OnInit {

  public msg: Message;
  private msgId: number;
  private folder: string;

  constructor(private getMail: GetMailService , private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.msgId = Number(params.get('msgId'));
      this.folder = params.get('folder');
      if (!this.getMail.validFolder(this.folder)) {
        router.navigate(['inbox']);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.msgId);
    const msg = this.getMail.getMsgById(this.msgId, this.folder);
    if (!msg) {
      this.router.navigate(['inbox']);
    } else {
      this.msg = msg;
    }
  }

}
