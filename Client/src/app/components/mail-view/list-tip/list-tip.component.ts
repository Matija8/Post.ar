import { Component, Input } from '@angular/core';

@Component({
  selector: 'postar-list-tip',
  templateUrl: './list-tip.component.html',
  styleUrls: ['./list-tip.component.css']
})
export class ListTipComponent {

  @Input() message: string;

  constructor() {}

}
