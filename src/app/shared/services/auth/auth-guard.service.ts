import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppAuthService } from './auth.service';
import { StorageKey } from '../../models/storage-key/storage-key';
import { StorageService } from '../client/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AppAuthService, public router: Router, private storageService: StorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.storageService.onRemoveToken(StorageKey.Token);
      this.storageService.onRemoveToken(StorageKey.User);
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
