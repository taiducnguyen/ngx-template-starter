import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageKey } from '../../models/storage-key/storage-key';
import { JwtTokenHelper } from 'app/shared/common';
import { AppAuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public router: Router, public auth: AppAuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRoles = <Array<any>>route.data.expectedRoles || [];
    const token = localStorage.getItem(StorageKey.Token);
    if (token == null) {
      this.onRemoveToken();
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return;
    }
    // decode the token to get its payload
    const tokenPayload = JwtTokenHelper.GetUserLoggedInInfo();
    if (!this.auth.isAuthenticated() || !expectedRoles.some(r => tokenPayload.roles.indexOf(r) != -1)) {
      this.router.navigate(['access-denied'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }

  onRemoveToken = () => {
    localStorage.clear();
  };
}
