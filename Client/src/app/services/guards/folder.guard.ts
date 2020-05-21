import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetMailService } from '../mail-services/get-mail.service';
import { AuthService } from '../mail-services/auth.service';
import { map, flatMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderGuard implements CanActivate {

  constructor(
    private getMail: GetMailService,
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.auth.loggedIn()) {
      if (this.auth.keepMeLoggedIn) {
        return this.auth.tryToLoginBySessionID()
        .pipe(
          flatMap(loginSuccessful => {
            if (loginSuccessful) {
              return this.waitForFolderActivation(route);
            } else {
              this.navigateToLogin();
              return of(false);
            }
          })
        );
      } else {
        this.navigateToLogin();
        return of(false);
      }
    }
    return this.waitForFolderActivation(route);
  }

  waitForFolderActivation(route: ActivatedRouteSnapshot): Observable<boolean> {
    const folderName = route.data.folderName;
    if (!folderName) {
      console.log('Folder name not set!');
      this.navigateToFallback();
      return of(false);
    }
    const folder = this.getMail.folders[folderName];
    if (!folder) {
      console.log('Bad folder name!');
      this.navigateToFallback();
      return of(false);
    }
    return folder.waitForActivation();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToFallback(): void {
    this.router.navigate(['/']);
  }

}
