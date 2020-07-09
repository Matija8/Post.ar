import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../mail-services/http-wrapper.service';
import { Endpoint } from 'src/app/endpoint';

export type Theme = 'theme-default' | 'theme-dark' | 'theme-funky';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {

  private activeTheme: Theme = 'theme-default';
  public readonly defaultTheme: Theme = 'theme-default';

  get theme(): Theme {
    return this.activeTheme;
  }

  set theme(newTheme: Theme) {
    document.body.classList.replace(this.activeTheme, newTheme);
    this.activeTheme = newTheme;
    this.storedTheme = newTheme;
  }

  private get storedTheme(): Theme {
    return localStorage.getItem('theme') as Theme;
  }

  private set storedTheme(newTheme: Theme) {
    localStorage.setItem('theme', newTheme);
  }

  constructor(private http: HttpWrapperService) {
    this.storedTheme = this.defaultTheme;
    document.body.classList.add(this.defaultTheme);

    // Using the storage api to update all the other open tabs in the browser.
    window.addEventListener('storage', () => {
      const newTheme: Theme = (localStorage.getItem('theme') as Theme) || 'theme-default';
      document.body.classList.replace(this.activeTheme, newTheme);
      this.activeTheme = newTheme;
    });
  }

  private updateThemeServer(newTheme: Theme): void {
    // Server expects theme string without the "theme-" prefix.
    const theme = newTheme.slice('theme-'.length);
    this.http.post(Endpoint.CHANGE_THEME, { theme }).subscribe(
      (res: any) => {},
      (err: any) => {
        console.log('Error on updateThemeServer in change-theme.service.ts:', err);
      }
    );
  }

  toggleDarkMode(): void {
    const darkTheme: Theme = 'theme-dark';
    if (this.theme === this.defaultTheme) {
      this.theme = darkTheme;
      this.updateThemeServer(darkTheme);
    } else {
      this.theme = this.defaultTheme;
      this.updateThemeServer(this.defaultTheme);
    }
  }
}
