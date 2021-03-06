import { FileModel } from '../file/file.model';
import { BaseModel } from '../base.model';

export enum UserRole {
  Offline = 1, //Offline
  Employee = 2, //Employee
  HR = 3, //HR
  Admin = 4, //Admin
  Customer = 5, //Customer
  CustomerVip = 6, //CustomerVip
  NailTech = 7, //NailTech
  NailTechVip = 8, //NailTechVip
  Salon = 9, //Salon
  SalonVip = 10 //SalonVip
}

export class UserLogedinModel extends BaseModel {
  constructor() {
    super();
  }
  access_token: string;
  expires_in: number;
  token_type: string;
  userId: string;
  userName: string;
  userType: UserRole;
  roles?: UserRole[];
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

export class UserContextModel {
  username: string;
  password: string;
  email?: string;
  remember?: boolean;
  grant_type?: string;
  constructor() {
    this.grant_type = 'password';
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
  Online = 1,
  Offline = 2
}

export enum UserStatus {
  InActive = 0,
  Active = 1
}
