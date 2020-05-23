import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpenComposeService } from 'src/app/services/ui-services/open-compose.service';

@Component({
  selector: 'postar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private openCompose: OpenComposeService) {}

  ngOnInit(): void {
  }

  public addCompose(): void {
    this.openCompose.addEditor(null);
  }
}
