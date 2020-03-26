import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeThemeService } from '../../services/change-theme.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData: User = null;
  authSubscription: Subscription;

  constructor(private changeThemeService: ChangeThemeService, private auth: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.currentUserData.subscribe(data => this.userData = data);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toggleTheme() {
    this.changeThemeService.toggleDarkMode();
  }

}
