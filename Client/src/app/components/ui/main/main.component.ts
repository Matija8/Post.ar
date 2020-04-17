import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'postar-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  AddComposeEvent: Subject<void> = new Subject<void>();

  ngOnInit(): void {
  }

  shouldSidebarRender() {
    if (
      this.router.url.startsWith('/inbox')
      || this.router.url.startsWith('/sent')
      || this.router.url.startsWith('/starred')
      || this.router.url.startsWith('/drafts')
    ) {
      return true;
    }
    return false;
  }

  addCompose() {
    this.AddComposeEvent.next();
  }

}
