import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeThemeService } from '../../../services/change-theme.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'postar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('showMenu') showMenu: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  userData: User = null;
  authSubscription: Subscription = null;
  menuVisible = false;

  constructor(private changeThemeService: ChangeThemeService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.currentUserData
    .subscribe(data => {
      this.userData = data;

      this.menuVisible = false;
      if (this.menu && this.menu.nativeElement) {
        this.menu.nativeElement.style.visibility = 'hidden';
      }
      if (this.showMenu && this.showMenu.nativeElement) {
        this.showMenu.nativeElement.style.visibility = this.auth.loggedIn() ? 'visible' : 'hidden';
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.showMenu && this.showMenu.nativeElement) {
      this.showMenu.nativeElement.style.visibility = this.auth.loggedIn() ? 'visible' : 'hidden';
    }
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

  showMenuClick() {
    const showMenu = this.showMenu.nativeElement as HTMLElement;
    const menu = this.menu.nativeElement as HTMLElement;
    if (!menu || !showMenu) {
      return;
    }
    menu.style.visibility = this.menuVisible ? 'hidden' : 'visible';
    this.menuVisible = !this.menuVisible;
  }

  logOut() {
    this.auth.userLogout();
    this.router.navigate(['/login']);
  }

}
