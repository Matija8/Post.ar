import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetMailService } from '../mail-services/get-mail.service';
import { AuthService } from '../mail-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FolderGuard implements CanActivate {

  constructor(private getMail: GetMailService, private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['login']);
      return of(false);
    }
    const folderName = route.data.folderName;
    if (!folderName) {
      console.log('Folder name not set!');
      this.router.navigate(['/']);
      return of(false);
    }
    const folder = this.getMail.folders[folderName];
    if (!folder) {
      console.log('Bad folder name!');
      this.router.navigate(['/']);
      return of(false);
    }

    return folder.waitForActivation();
  }

}
