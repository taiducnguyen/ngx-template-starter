import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { AppNavModel, AppNavItem } from '@app/shared/models/app-nav/app-nav.model';
import { navItems } from './navigation.model';
import { UserRole, UserLogedinModel } from '@app/shared/models/user/user.model';
import { JwtTokenHelper } from '@app/shared/common';
import { AppAuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() isToggleNav: boolean;
  @Output() onToggleAppNav: EventEmitter<boolean> = new EventEmitter();
  public navModels: AppNavModel = { items: navItems };

  private locationPath: string;
  private isAuthen: boolean;
  private userInfo: UserLogedinModel;

  constructor(private router: Router, private i18nService: I18nService, private authService: AppAuthService) {
    this.isAuthen = this.authService.isAuthenticated();

    if (this.isAuthen) {
      this.userInfo = JwtTokenHelper.GetUserLoggedInInfo();
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.locationPath = event.urlAfterRedirects.slice(1);
        let navigationPaths = this.locationPath.split('/');
        this.navModels.items.map(main => {
          main.children.map(parent => {
            if (parent.url == navigationPaths[1]) {
              parent.isActive = true;
            }
            if (parent.children.some(child => child.url == navigationPaths[1])) {
              parent.isActive = true;
            }
          });
        });
      }
    });
  }

  ngOnInit() {}

  onToggleNav = (item: AppNavItem) => {
    if (item) {
      if (item.children.length <= 0) {
        this.router.navigate(['admin', item.url]);
      }
      item.isActive = !item.isActive;
    }
  };

  checkActivateUrl = (parentItem: AppNavItem) => {
    let navigationPaths = this.locationPath ? this.locationPath.split('/') : [];

    if (!parentItem && !navigationPaths) {
      return false;
    }

    return parentItem.url == navigationPaths[1] || parentItem.children.some(child => child.url == navigationPaths[1]);
  };

  onCheckPermision = (allowRows: UserRole[]) => {
    if (allowRows.length == 0) {
      return true;
    }
    return true;
    //return allowRows && allowRows.some(r => this.userInfo.roles.indexOf(r) != -1);
  };
}
