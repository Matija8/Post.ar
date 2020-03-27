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
    ChangeThemeService.activeTheme = this.storedTheme;
    this.changeTheme(ChangeThemeService.activeTheme);
  }

  private changeTheme(newTheme: Theme): void {
    document.body.classList.remove(ChangeThemeService.activeTheme);
    ChangeThemeService.activeTheme = newTheme;
    this.storedTheme = newTheme;
    document.body.classList.add(newTheme);
  }

  public toggleDarkMode(): void {
    if (ChangeThemeService.activeTheme === 'theme-default') {
      this.changeTheme('theme-dark');
    } else {
      this.changeTheme('theme-default');
    }
  }
}
