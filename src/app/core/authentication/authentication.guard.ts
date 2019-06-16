import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';
import { StorageService } from '@app/shared/services/client/storage.service';
import { Injectable } from '@angular/core';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService, private storageService: StorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      log.debug('Not authenticated, redirecting and adding redirect url...');
      this.storageService.onRemoveToken(StorageKey.Token);
      this.storageService.onRemoveToken(StorageKey.User);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }, replaceUrl: true });
      return false;
    }
    return true;
  }
}
