import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'postar-selected-icon',
  templateUrl: './selected-icon.component.html'
})
export class SelectedIconComponent {
  @Output() toggle = new EventEmitter<void>();
  @Input() selectedChar: string;

  constructor() { }

}
