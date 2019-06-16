import { UserRole } from '@app/shared/models/user/user.model';
import { AppNavItem } from '@app/shared/models/app-nav/app-nav.model';

export const navItems: AppNavItem[] = [
  // {
  //   id: 'main-view',
  //   translateKey: 'Nav.MainView',
  //   title: 'Main view',
  //   icon: '',
  //   type: 'nav-category',
  //   url: 'main',
  //   allowRoles: [],
  //   children: [
  //     {
  //       id: 'email-templates',
  //       translateKey: 'Nav.MainView',
  //       title: 'Admin',
  //       icon: 'fas fa-home',
  //       subIcon: '',
  //       type: 'nav-parent',
  //       url: '',
  //       isActive: false,
  //       allowRoles: [],
  //       children: []
  //   }
  //   ]
  // },
  {
    id: 'admin-view',
    translateKey: 'Nav.AdminView',
    title: 'Admin view',
    icon: '',
    type: 'nav-category',
    url: 'admin-view',
    allowRoles: [UserRole.Admin],
    children: [
      {
        id: 'email-templates',
        translateKey: 'Nav.AdminView',
        title: 'Admin',
        icon: 'fas fa-user',
        subIcon: '',
        type: 'nav-parent',
        url: 'category',
        isActive: false,
        allowRoles: [UserRole.Admin],
        children: [
          {
            id: 'email-templates',
            translateKey: 'Nav.Admin.EmailTemplate',
            title: 'Email Templates',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'home',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'counterpart-group',
            translateKey: 'Nav.Admin.Employee',
            title: 'Counterpart Group',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'about',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          }
        ]
      }
    ]
  }
];
