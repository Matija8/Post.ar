import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {

  private static activeTheme: string;

  get storedTheme() {
    return localStorage.getItem('theme');
  }

  set storedTheme(newTheme: string) {
    localStorage.setItem('theme', newTheme);
  }

  private themes: { [key: string]: {[key: string]: string} } = {
    default: {
      '--background-color1': 'rgb(200,200,200)',
      '--background-color2': 'rgb(224,224,224)',
    },
    dark: {
      '--background-color1': 'gray',
      '--background-color2': 'rgb(180,180,180)',
    },
  };

  constructor() {
    this.storedTheme = this.storedTheme === null ? 'default' : this.storedTheme;
    ChangeThemeService.activeTheme = this.storedTheme;
    this.changeTheme(ChangeThemeService.activeTheme);
  }

  private changeTheme(newTheme: string): void {
    const root = document.documentElement;
    const cssValues = this.themes[newTheme];
    if (cssValues === undefined) {
      console.log('change-theme.service: cssValues = undefined!');
      return;
    }

    ChangeThemeService.activeTheme = newTheme;
    this.storedTheme = newTheme;
    for (const [key, value] of Object.entries(cssValues)) {
      root.style.setProperty(key, value);
    }
  }

  public toggleDarkMode(): void {
    if (ChangeThemeService.activeTheme === 'default') {
      this.changeTheme('dark');
    } else {
      this.changeTheme('default');
    }
  }
}
