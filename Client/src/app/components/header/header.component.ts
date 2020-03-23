import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from '../../services/change-theme.service';

@Component({
  selector: 'postar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private changeThemeService: ChangeThemeService) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.changeThemeService.toggleDarkMode();
  }

}
