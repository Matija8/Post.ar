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
  public openEditors = new Map<number, any>();

  public freeIds = ((max: number): number[] => {
    const freeIds = [];
    for (let i = 0; i < max; i++) {
      freeIds.push(i);
    }
    return freeIds;
  })(this.MAX_OPEN);

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
    console.log(this.freeIds);
    if (this.freeIds.length <= 0) {
      return;
    }
    this.openEditors.set(this.freeIds.pop(), { to: '', subject: '', msg: '' } );
  }

  closeEditor(id: number): void {
    this.openEditors.delete(id);
    this.freeIds.push(id);
  }

}
