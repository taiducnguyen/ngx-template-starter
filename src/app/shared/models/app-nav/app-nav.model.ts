import { UserRole } from '../user/user.model';

export interface AppNavModel {
  items: AppNavItem[];
}

export interface AppNavItem {
  id: string;
  title: string;
  icon: string;
  subIcon?: string;
  translateKey?: string;
  type: string;
  url: string;
  allowRoles?: UserRole[];
  isActive?: boolean;
  children?: AppNavItem[];
}
