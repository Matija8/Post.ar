import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'postar-compose-item',
  templateUrl: './compose-item.component.html',
  styleUrls: ['./compose-item.component.css']
})
export class ComposeItemComponent implements OnInit {

  @Input() id: number;
  @Input() data: any;

  @Output() closeEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  send() {
    console.log(`
      send clicked:
      to = ${this.data.to}
      subject = ${this.data.subject}
      msg = ${this.data.msg}`);
  }

  closeClick() {
    this.closeEvent.emit(this.id);
  }

  changeSize(newSize: string) {
    const sizes = Object.freeze(['normal', 'minimized', /*'maximized'*/]);
    if ( !sizes.includes(newSize) ) {
      return;
    }
    this.data.size = newSize;
  }

}
