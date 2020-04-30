import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FolderGuard } from './folder.guard';
import { GetMailService } from '../mail-services/get-mail.service';

@Injectable({
  providedIn: 'root'
})
export class MessageGuard implements CanActivate {

  constructor(private getMail: GetMailService, private fg: FolderGuard) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const folderName = route.paramMap.get('folder');
    if (!this.getMail.folders[folderName]) {
      return of(false);
    } else {
      route.data = { folderName };
      return this.fg.canActivate(route);
    }
  }

}
