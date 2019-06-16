import { Injectable } from '@angular/core';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '@app/shared/services/client/storage.service';
import { JwtTokenHelper } from '@app/shared/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _redirectUrl: string;

  constructor(public jwtHelper: JwtHelperService, private storageService: StorageService) {}

  public isAuthenticated = (): boolean => {
    const token = this.storageService.onGetToken(StorageKey.Token);
    return !!token;
  };

  public set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  public get redirectUrl(): string {
    return this._redirectUrl;
  }
}
