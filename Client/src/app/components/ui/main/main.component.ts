import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'postar-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  addComposeSubject: Subject<void> = new Subject<void>();
  private insideAFolder: boolean;
  private sub: Subscription = null;

  public opened: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // This is neccessary to not render the sidebar for routes like /inbox/messageId/extraText
    const sub = this.router
    .events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.folderName) {
            return child.snapshot.data.folderName;
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe( (folderName: string) => {
      this.insideAFolder = !!folderName;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  shouldSidebarRender(): boolean {
    return this.insideAFolder;
  }

  shouldHeaderRender(): boolean {
    return this.shouldSidebarRender();
  }

}
