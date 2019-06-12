import { FileModel } from '../file/file.model';
import { BaseModel } from '../base.model';

export enum UserRole {
  Admin = 1,
  MerconEmployee = 2,
  Exporter = 3
}

export class UserLogedinModel extends BaseModel {
  constructor() {
    super();
  }
  userId: number;
  token: string;
  userName: string;
  email?: string;
  expired: number;
  phone?: string;
  active?: boolean;
  roles?: UserRole[];
  userType?: UserType;
  roleId?: number;
  roleName?: string;
  systemAdmin?: boolean;
}

export class UserChangePasswordModel extends BaseModel {
  constructor() {
    super();
  }
  newPassword: string;
  password: string;
  userName: string;
}

export class UserProfileModel extends BaseModel {
  constructor() {
    super();
  }
  userId?: number;
  companyId: number;
  companyName?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roles?: UserRole[];
  phone: string;
  avatar?: FileModel;
  status: UserStatus;
  roleId: number;
  roleName?: string;
  counterpartId?: number;
  counterpartName?: string;
  userType?: UserType;
}

export class UserModel extends UserProfileModel {
  constructor() {
    super();
  }
  userId: number;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export class UserResetPasswordModel {
  constructor() {}
  userId: number;
  keyCode?: string;
  password: string;
  rePassword: string;
}

export class UserLoginModel {
  userName: string;
  password: string;
  email?: string;
  // grant_type?: string;
  constructor() {
    // this.grant_type = "password";
  }
}

export class UserInfoModel {
  avatar: FileModel;
  email: string;
  fullName: string;
  userId: number;
  userName: string;
}

export class UserImageProfileModel {
  id: number; // userId
  userProfile: File;
}

export class UserDropdownModel {
  id: number;
  userName: string;
  email: string;
}

export class UserRoleGroup {
  groupId: number;
  groupName: number;
}

export enum UserType {
  Internal = 1,
  External = 2
}

export enum UserStatus {
  InActive = 0,
  Active = 1
}
