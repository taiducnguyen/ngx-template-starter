import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageKey } from '../../shared/models/storage-key/storage-key';
import { JwtTokenHelper } from '../../shared/common';
import { UserContextModel, UserType, UserRole, UserLogedinModel } from '@app/shared/models/user/user.model';
import { ApiError } from '@app/shared/models/api-response/api-response';
import { ClientState } from '@app/shared/services/client/client-state';
import { AuthenticationService, I18nService } from '@app/core';
import { StorageService } from '@app/shared/services/client/storage.service';
import { LoginService } from '@app/shared/services/api/app/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private userContextModel: UserContextModel = new UserContextModel();
  private isError: boolean;
  private loginError: ApiError;
  private returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientState: ClientState,
    private authenService: AuthenticationService,
    private storageService: StorageService,
    private loginService: LoginService,
    private i18nService: I18nService
  ) {}

  public ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authenService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onLogin = (form: NgForm) => {
    if (form.invalid) {
      return;
    }
    this.isError = false;
    this.clientState.isBusy = true;
    this.storageService.onRemoveToken(StorageKey.UserInfo);
    this.loginService.onLogin(this.userContextModel).subscribe(
      res => {
        let userLoggedinModel = <UserLogedinModel>{ ...res.content };
        // userLoggedinModel.roles = userLoggedinModel.ro ? [UserRole.Admin]
        //   : userLoggedinModel.userType == UserType.Online ? [UserRole.MerconEmployee] : [];

        if (userLoggedinModel && userLoggedinModel.token) {
          this.storageService.onSetToken(StorageKey.Token, userLoggedinModel.token);
          this.storageService.onSetToken(StorageKey.User, JwtTokenHelper.CreateSigningToken(userLoggedinModel));
          this.router.navigate([this.returnUrl]);
        }
        this.clientState.isBusy = false;
      },
      (err: ApiError) => {
        this.isError = true;
        this.loginError = err;
        this.clientState.isBusy = false;
      }
    );
  };
}
