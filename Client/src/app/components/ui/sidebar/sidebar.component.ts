import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'postar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() addComposeItemEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  composeButtonClick() {
    this.addComposeItemEvent.emit();
  }

}