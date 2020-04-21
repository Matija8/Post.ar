import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeThemeService } from '../../../services/ui-services/change-theme.service';
import { AuthService } from '../../../services/mail-services/auth.service';
import { User } from '../../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSubscription: Subscription = null;
  showMenuBtnVisibile: 'visible'|'hidden' = this.auth.loggedIn() ? 'visible' : 'hidden';
  dropdownHidden = true;
  letter = ' ';

  constructor(private changeThemeService: ChangeThemeService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.currentUserData
    .subscribe((userData: User) => {
      this.showMenuBtnVisibile = !!userData ? 'visible' : 'hidden';
      this.dropdownHidden = true;
      if (userData) {
        const name: string = userData.name;
        if (typeof(name) === 'string' && name.length > 0) {
          this.letter = name[0].toUpperCase();
        }
      } else {
        this.letter = ' ';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription !== null) {
      this.authSubscription.unsubscribe();
      this.authSubscription = null;
    }
  }

  toggleTheme(): void {
    this.changeThemeService.toggleDarkMode();
  }

  logOut() {
    this.auth.userLogout();
    this.router.navigate(['/login']);
  }

}
