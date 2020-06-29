import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'postar-selected-icon',
  templateUrl: './selected-icon.component.html',
  styles: [':host { padding-top: 3px; margin-left: 5px } ']
})
export class SelectedIconComponent {
  @Output() toggle = new EventEmitter<void>();
  @Input() selectedChar: string;

  constructor() { }

}
