import { UserRole } from '@app/shared/models/user/user.model';
import { AppNavItem } from '@app/shared/models/app-nav/app-nav.model';

export const navItems: AppNavItem[] = [
  {
    id: 'main-view',
    translateKey: 'Nav.MainView',
    title: 'Main view',
    icon: '',
    type: 'nav-category',
    url: 'main',
    allowRoles: [],
    children: [
      {
        id: 'email-templates',
        translateKey: 'Nav.MainView',
        title: 'Admin',
        icon: 'fas fa-home',
        subIcon: '',
        type: 'nav-parent',
        url: '',
        isActive: false,
        allowRoles: [],
        children: []
      }
    ]
  },
  {
    id: 'admin-view',
    translateKey: 'Nav.AdminView',
    title: 'Admin view',
    icon: '',
    type: 'nav-category',
    url: 'admin-view',
    allowRoles: [UserRole.Admin, UserRole.MerconEmployee],
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
        allowRoles: [UserRole.Admin, UserRole.MerconEmployee],
        children: [
          {
            id: 'email-templates',
            translateKey: 'Nav.Admin.EmailTemplate',
            title: 'Email Templates',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'about',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'email-generated',
            translateKey: 'Nav.Admin.EmailGenerated',
            title: 'Email Generated',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'mails-generated',
            isActive: false,
            allowRoles: [UserRole.Admin, UserRole.MerconEmployee],
            children: []
          },
          {
            id: 'restaurant',
            translateKey: 'Nav.Admin.CounterpartConfiguration',
            title: 'Counterpart Configuration',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'counterpart-configuration',
            isActive: false,
            allowRoles: [UserRole.Admin, UserRole.MerconEmployee],
            children: []
          },
          {
            id: 'user-configuration',
            translateKey: 'Nav.Admin.UserConfiguration',
            title: 'User Configuration',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'user-configuration',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'role-management',
            translateKey: 'Nav.Admin.RoleManagement',
            title: 'Role Management',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'role-management',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'field-configuration',
            translateKey: 'Nav.Admin.FieldConfiguration',
            title: 'Role Configuration',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'field-configuration',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'actions-configuration',
            translateKey: 'Nav.Admin.ActionsConfiguration',
            title: 'Actions Configuration',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'actions-configuration',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'user-logs',
            translateKey: 'Nav.Admin.UserLogs',
            title: 'User Logs',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'user-logs',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'groups',
            translateKey: 'Nav.Admin.Groups',
            title: 'Groups',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'groups',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          },
          {
            id: 'counterpart-group',
            translateKey: 'Nav.Admin.CounterpartGroup',
            title: 'Counterpart Group',
            icon: '',
            subIcon: '',
            type: 'nav-children',
            url: 'counterpart-group',
            isActive: false,
            allowRoles: [UserRole.Admin],
            children: []
          }
        ]
      }
    ]
  }
];
