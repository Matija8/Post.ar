import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'postar-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  to = '';
  subject = '';
  msg = '';

  constructor() { }

  ngOnInit(): void {
  }

  send() {
    console.log(`
      send clicked:
      to = ${this.to}
      subject = ${this.subject}
      msg = ${this.msg}`);
  }

}
