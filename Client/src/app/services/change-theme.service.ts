import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {

  private static activeTheme = 'default';

  private modes: { [key: string]: {[key: string]: string} } = {
    default: {
      '--background-color1': 'rgb(200,200,200)',
      '--background-color2': 'rgb(224,224,224)',
    },
    dark: {
      '--background-color1': 'gray',
      '--background-color2': 'rgb(180,180,180)',
    },
  };

  constructor() { }

  private changeMode(newTheme: string): void {
    const root = document.documentElement;
    const cssValues = this.modes[newTheme];
    if (cssValues === undefined) {
      console.log('change-theme.service: changeMode-cssValues = undefined!');
      return;
    }

    ChangeThemeService.activeTheme = newTheme;
    for (const [key, value] of Object.entries(cssValues)) {
      root.style.setProperty(key, value);
    }
  }

  public toggleDarkMode(): void {
    if (ChangeThemeService.activeTheme === 'default') {
      this.changeMode('dark');
    } else {
      this.changeMode('default');
    }
  }
}
