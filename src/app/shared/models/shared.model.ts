export interface MenuRoute {
  title: string;
  route: string;
  icon?: string;
  selected?: boolean;
  url?: string;
}

export interface LoggedInUserModel {
  id?: number;
  email: string;
  password: string;
}

export interface DialogModel {
  message: string;
  action?: boolean;
}

export interface UserRegisterModel {
  id?: number;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  landLineNumber?: string;
  city: string;
  address: string;
  email: string;
  userName: string;
  password?: string;
  userType: string;
  registerDate?: Date;
}

export enum UserTableColumns {
  NAME = 'name',
  MOBILE_NUMBER = 'mobileNumber',
  EMAIL = 'email',
  ZONE = 'zone',
  ACTION = 'action'
}

export enum PatientTableColumns {
  NAME = 'name',
  MOBILE_NUMBER = 'mobileNumber',
  ZONE = 'zone',
  MONITOR = 'monitor',
  ACTION = 'action'
}

export interface UserSectionModel {
  totalUsers?: number;
  totalZones?: number;
  users: UserModel[];
  userType?: string;
  tableColumns: string[];
  enrollNewUser: boolean;
  showCount: boolean;
  searchByPincode?: boolean;
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  alternateMobileNumber: number;
  governmentId: string;
  doorNumber: string;
  streetName: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  zone: string;
  monitorAssigned?: string;
  userType: string;
}

export const UserTypes: string[] = ['Quarantine Managers','Monitors'];

export const MobileNumberValidationPattern: string = '^[0-9]{10}$';

export const EmailValidationPattern: string = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

export const PasswordValidationPattern: string = '^(?=.*[A-Za-z])(?=.*\\d{1,3})[A-Za-z0-9\\d@$.!%*_#?&]{5,20}$';

export const UserNameValidationPattern: string = '^(?=.*[A-Za-z])[A-Za-z][A-Za-z0-9]{4,20}$';

export const DefaultPaginatorValues: number[] = [5, 10, 15, 20, 50]; 

export const BooleanOptionValues: string[] = ['Yes', 'No'];

export const DefaultErrorMessage: string = 'Oops! Something went wrong. Please try again.';