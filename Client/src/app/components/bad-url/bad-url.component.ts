import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-bad-url',
  templateUrl: './bad-url.component.html',
  styleUrls: ['./bad-url.component.css']
})
export class BadURLComponent implements OnInit, OnDestroy {

  public loggedIn: boolean;
  private sub: Subscription = null;

  constructor(private auth: AuthService) {
    this.sub = this.auth.currentUserData.subscribe(data => {
      this.loggedIn = !!data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

}
