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
  ID = 'id',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  MOBILE_NUMBER = 'mobileNumber',
  LAND_LINE_NUMBER = 'landLineNumber',
  CITY = 'city',
  ADDRESS = 'address',
  EMAIL = 'email',
  USERNAME = 'userName',
  USER_TYPE = 'userType',
  ACTION = 'action'
}

export const UserTypes: string[] = ['Quarantine Managers','Monitors'];

export const MobileNumberValidationPattern: string = '^[0-9]{10}$';

export const EmailValidationPattern: string = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

export const PasswordValidationPattern: string = '^(?=.*[A-Za-z])(?=.*\\d{1,3})[A-Za-z0-9\\d@$.!%*_#?&]{5,20}$';

export const UserNameValidationPattern: string = '^(?=.*[A-Za-z])[A-Za-z][A-Za-z0-9]{4,20}$';

export const DefaultPaginatorValues: number[] = [5, 10, 15, 20, 50]; 

export const BooleanOptionValues: string[] = ['Yes', 'No'];

export const DefaultErrorMessage: string = 'Oops! Something went wrong. Please try again.';