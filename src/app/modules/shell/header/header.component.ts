import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, I18nService } from '@app/core';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';
import { ApiError } from '@app/shared/models/api-response/api-response';
import { UserProfileModel, UserLogedinModel } from '@app/shared/models/user/user.model';
import { JwtTokenHelper } from '@app/shared/common';
import { StorageService } from '@app/shared/services/client/storage.service';
import { ClientState } from '@app/shared/services/client/client-state';
import { LoginService } from '@app/shared/services/api/app/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onToggleNav: EventEmitter<boolean> = new EventEmitter();
  public isToggleNav: boolean = false;

  public isAuthen: boolean = true;
  public isToggleUserProfile: boolean;
  private userInfo: UserLogedinModel;
  private userProfile: UserProfileModel = new UserProfileModel();
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private storageService: StorageService,
    private clientState: ClientState,
    private loginService: LoginService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    // this.isAuthen = this.authService.isAuthenticated();
    // if (this.isAuthen) {
    //   this.userInfo = JwtTokenHelper.GetUserLoggedInInfo();
    //   this.onGetUserProfile();
    // }
    // this.clientState.reloadUserProfile.subscribe(isReloadComponent => {
    //   this.onGetUserProfile();
    // })
  }

  public onGetUserProfile = () => {
    // let userInfoDetails = JwtTokenHelper.GetUserInfoDetails()
    // if (userInfoDetails) {
    //   this.userProfile = userInfoDetails;
    //   return;
    // }
    // // this.clientState.isBusy = true;
    // this.userService.onGetUserDetails(this.userInfo.userId).subscribe(res => {
    //   this.userProfile = res.content ? <UserProfileModel>{ ...res.content } : null;
    //   // this.clientState.isBusy = false;
    // }, (err: ApiError) => {
    //   this.clientState.isBusy = false;
    // });
  };

  toggleUserProfile = (isToggle: boolean) => {
    this.isToggleUserProfile = isToggle == false ? false : !this.isToggleUserProfile;
  };

  onLogout = () => {
    // this.clientState.isBusy = true;
    // Promise.all([
    //   this.loginService.onLogout(this.userInfo.userId),
    //   this.storageService.onRemoveTokens([StorageKey.User, StorageKey.Token, StorageKey.UserInfo]),
    // ]).then(res => {
    //   this.userInfo = null;
    //   this.router.navigate(['login']);
    //   this.clientState.isBusy = false;
    // }, err => {
    //   this.clientState.isBusy = false;
    // })
  };

  onToggleAppNav = () => {
    this.isToggleNav = !this.isToggleNav;
    this.onToggleNav.emit(this.isToggleNav);
  };

  ngOnDestroy(): void {
    // this.clientState.reloadUserProfile.unsubscribe();
  }
}
