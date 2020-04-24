import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'postar-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  addComposeSubject: Subject<void> = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  shouldSidebarRender() {
    const validRoutePrefixes = ['/inbox', '/sent', '/starred', '/drafts'];
    for (const prefix of validRoutePrefixes) {
      if (this.router.url.startsWith(prefix)) {
        return true;
      }
    }
    return false;
  }

}
