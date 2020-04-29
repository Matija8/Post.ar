import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/mail-services/auth.service';

@Component({
  selector: 'postar-bad-url',
  templateUrl: './bad-url.component.html',
  styleUrls: ['./bad-url.component.css']
})
export class BadURLComponent implements OnInit {

  public loggedIn: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.loggedIn();
  }

}
