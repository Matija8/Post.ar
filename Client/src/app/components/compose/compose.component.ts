import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'postar-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit, OnDestroy {

  @Input() signalFromParent: Observable<void>;
  private signalSubscription: Subscription;

  private MAX_OPEN = 3;
  private open = 0;
  private lastId = 0;
  public openEditors = new Map<number, any>();

  constructor() { }

  ngOnInit(): void {
    this.signalSubscription = this.signalFromParent.subscribe(() => {
      this.addEditor();
    });
  }

  ngOnDestroy(): void {
    this.signalSubscription.unsubscribe();
  }

  addEditor(): void {
    if (this.open >= this.MAX_OPEN) {
      return;
    }
    this.open++;
    this.openEditors.set(this.lastId++, { to: '', subject: '', msg: '' } );
  }

  closeEditor(id: number): void {
    if (this.open <= 0) {
      return;
    }
    this.openEditors.delete(id);
    this.open--;
    if (this.open === 0) {
      this.lastId = 0;
    }
  }

}
