export interface MenuRoute {
  title: string;
  route: string;
  icon?: string;
  selected?: boolean;
  url?: string;
}

export interface LoggedInUserModel {
  USERNAME: string;
  PASSWORD: string;
}

export interface DialogModel {
  message: string;
  action?: boolean;
}

export interface PersonalDetails {
 name: string;
 type: string; 
 id: number; 
 phone: number;
 email: string;
 zone: string;
 address: string;
}

export interface MonitorAndManagerList {
  QMID?: number;
  MID?: number;
  PHONE: number;
  FIRSTNAME: string;
  DESIGNATION: string;
  PINCODE: string;
  EMAIL: string;
  LOGINNAME: string;
  DEPARTMENT: string;
  LASTNAME: string;
  ADDRESS: string;
}

export interface UserRegisterModel {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  designation: string;
  department: string;
  zone: string;
  governmentIdType: string;
  governmentIdImage: string;
  userType: string;  

  houseNumber: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  
  loginName: string;
  password: string;
}

export enum UserTableColumns {
  NAME = 'name',
  ID_NUMBER = "idNumber",
  CONTACT_NUMBER = 'contactNumber',
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

export class UserSectionModel {
  totalUsers?: number = 0;
  totalZones?: number = 0;
  users: UserModel[] = [];
  userType?: string = '';
  tableColumns: string[] = [];
  enrollNewUser: boolean = false;
  showCount: boolean = false;
  searchByPincode?: boolean = true;
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

export interface Payload {
  KEY:string;
  PAYLOAD:any;
}



export const UserTypes: string[] = ['Quarantine Managers','Monitors'];

export const MobileNumberValidationPattern: string = '^[0-9]{10}$';

export const EmailValidationPattern: string = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

export const PasswordValidationPattern: string = '^(?=.*[A-Za-z])(?=.*\\d{1,3})[A-Za-z0-9\\d@$.!%*_#?&]{5,20}$';

export const UserNameValidationPattern: string = '^(?=.*[A-Za-z])[A-Za-z][A-Za-z0-9]{4,20}$';

export const DefaultPaginatorValues: number[] = [10, 20, 30, 50]; 

export const BooleanOptionValues: string[] = ['Yes', 'No'];

export const GovernmentIdTypes: string[] = ['Voter Id', 'Aadhar', 'Pan Card', 'License', 'Passport'];

export const DefaultErrorMessage: string = 'Oops! Something went wrong. Please try again.';