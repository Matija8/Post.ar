import { Injectable } from '@angular/core';

type Theme = 'theme-default' | 'theme-dark' | 'theme-funky';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {

  private static activeTheme: Theme;

  private get storedTheme(): Theme {
    return localStorage.getItem('theme') as Theme;
  }

  private set storedTheme(newTheme: Theme) {
    localStorage.setItem('theme', newTheme);
  }

  constructor() {
    if (this.storedTheme === null) {
      this.storedTheme = 'theme-default';
    }
    ChangeThemeService.activeTheme = this.storedTheme;
    document.body.classList.add(ChangeThemeService.activeTheme);
  }

  private changeTheme(newTheme: Theme): void {
    document.body.classList.replace(ChangeThemeService.activeTheme, newTheme);
    ChangeThemeService.activeTheme = newTheme;
    this.storedTheme = newTheme;
  }

  public toggleDarkMode(): void {
    if (ChangeThemeService.activeTheme === 'theme-default') {
      this.changeTheme('theme-dark');
    } else {
      this.changeTheme('theme-default');
    }
  }
}
