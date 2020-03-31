import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ChangeThemeService } from '../../services/change-theme.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
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
  authSubscription: Subscription;
  private toggleMenu: () => void = null;

  constructor(private changeThemeService: ChangeThemeService, private auth: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.auth.currentUserData.subscribe(data => this.userData = data);
  }

  ngAfterViewInit(): void {
    const showMenu = this.showMenu.nativeElement as HTMLElement;
    const menu = this.menu.nativeElement as HTMLElement;
    if (!menu || !showMenu) {
      return;
    }
    let newMenuStyle = { display: 'none'};
    this.toggleMenu = () => {
      newMenuStyle = newMenuStyle.display !== 'none' ? { display: 'none' } : { display: 'flex' };
      menu.style.display = newMenuStyle.display;
    };
    showMenu.addEventListener('click', this.toggleMenu);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    const showMenu = this.showMenu.nativeElement as HTMLElement;
    if (!(showMenu && this.toggleMenu)) {
      return;
    }
    showMenu.removeEventListener('click', this.toggleMenu);
  }

  toggleTheme(): void {
    this.changeThemeService.toggleDarkMode();
  }

}
