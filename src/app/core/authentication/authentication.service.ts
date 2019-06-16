import { Injectable } from '@angular/core';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _redirectUrl: string;

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated = (): boolean => {
    const token = localStorage.getItem(StorageKey.Token);
    return !this.jwtHelper.isTokenExpired(token);
  };

  public set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  public get redirectUrl(): string {
    return this._redirectUrl;
  }
}
