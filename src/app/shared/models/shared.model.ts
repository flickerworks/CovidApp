export interface MenuRoute {
  title: string;
  route: string;
  icon?: string;
  selected?: boolean;
  url?: string;
}

export interface LoggedInUserModel {
  LOGINNAME: string;
  PASSWORD: string;
}



export interface LoginResponse {
  loginAs: string;
  phone: string;
  firstName: string;
  lastName: string;
  pincode: string;
  email: string;
  zone: string;
}

export interface DialogModel {
  message: string;
  action?: boolean;
}

export interface PersonalDetails {
 name?: string;
 type: string; 
 id: number; 
 phone: number;
 email: string;
 zone: string;
 area: string;
 houseNo: string;
 street: string;
 state: string;
 pincode: string;
 city: string;
 firstName: string;
 lastName: string;
 loginName: string;
 password: string;
 department: string;
 designation: string;
 idCardType: string;
}

export interface MonitorAndManagerList {
  QMID?: number;
  MID?: number;
  STATE: string;
  AREA: string;
  STREETNAME: string;
  HNO: string;
  IDCARDTYPE: string;
  PHONE: number;
  FIRSTNAME: string;
  DESIGNATION: string;
  IDNUMBER: number;
  PINCODE: string;
  ZONE: string;
  EMAIL: string;
  CITY: string;
  LOGINNAME: string;
  PASSWORD: string;
  DEPARTMENT: string;
  LASTNAME: string; 
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

export interface PatientDetails {
  name: string;
  id: string;
  contactNumber?: number;
  mail?: string;
  zone: string;
  period?: string;
  symptoms?: string[];
  monitoredBy?: string;
  critical?: number;
  flaged?: number;
}

export interface PatientFullDetails {
  fName: string;
  lName: string;
  id: string;
  idType: string;
  dob: string;
  phone: string;
  status: string;
  zone: string;
  qDuration: string;
  reason: string;
  missedUpdate: string;
  critical: string;
  pendingReview: string;
  flagged: string;
  email: string;
  qType: string;
  symtoms: string;
  qAddress: string;
  cAddress: string;
  pAddress: string;
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

export enum QuarantineTableColumns {
  NAME = 'name',
  ID = "id",
  CONTACT_NUMBER = 'contactNumber',
  // MAIL = 'mail',
  ZONE = 'zone',
  IN_QUARANTINE = 'inQuarantine',
  SYMPTOMS = 'symptoms',
  MONITORED_BY = 'monitoredBy',
  ACTION = 'user-action'
}

export enum MonitorTableColumns {
  NAME = 'name',
  ID = "id",
  CONTACT_NUMBER = 'contactNumber',
  MAIL = 'mail',
  ZONE = 'zone',
  QUARANTINE_COUNT = 'quarantineCount',
  ACTION = 'action'
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
  designation: string;
  department: string;
  loginName:string;
  password: string;
}

export interface AdminDashboardUserModel {
  idNumber: number;
  name: string;
  email: string;
  contactNumber: number;
  zone: string;
}

export interface Payload {
  KEY:string;
  PAYLOAD:any;
}

export interface PatientPersonalDetailsModel {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  alternateMobileNumber: number;
  governmentIdType: string;
  governmentIdNumber: string;
  email: string;
  dateOfBirth: string;
}

export interface PatientHealthStatusModel {
  fever: string;
  temperature: string;
  cough: string;
  fatigue: string;
  breathing: string;
  diarrhea: string;
  runnyNose: string;
}

export interface PatientAddressModel {
  currentAddress: AddressModel,
  permanentAddress: AddressModel,
  quarantineAddress: AddressModel,
  quarantineType: string;
}

export interface AddressModel {
  houseNumber: string;
  streetName: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  zone: string;
}

export interface AssignMonitorModel {
  idNumber: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  zone: string;
  email: string;
  userType: string;
}

export interface ReportData {
  TOTALCRITICAL: number;
  REPORTDATE: string;
  TOTALRECORDS: number;
}

export interface MonthData {
  date: string;
  total: number;
  critical: number;
}

export interface SingleChart {
  name: string;
  value: number;
}

export interface MultiChart {
  name: string;
  series: SingleChart[];
}

export enum AssignMonitorColumns {
  // ID_NUMBER = "idNumber",
  SELECT = 'select',
  NAME = 'name',
  CONTACT_NUMBER = 'contactNumber',
  ZONE = 'zone',
  EMAIL = 'email'
}

export interface MapAddress {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

export interface State {
  id: string;
  name: string;
  country_id: string;
}

export interface City {
  id: string;
  name: string;
  state_id: string;
}

export const UserTypes: string[] = ['Quarantine Managers','Monitors'];

export const MobileNumberValidationPattern: string = '^[0-9]{10}$';

export const PincodeValidationPattern: string = '^[0-9]{6}$';

export const StringValidationPattern: string = '^(?=.*[A-Za-z])[A-Za-z][A-Za-z ]{1,}$';

export const EmailValidationPattern: string = '[a-zA-Z0-9.-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}';

export const TemperatureValidationPattern: string = '[0-9.]{0,6}';

export const PasswordValidationPattern: string = '^(?=.*[A-Za-z])(?=.*\\d{1,3})[A-Za-z0-9\\d@$.!%*_#?&]{5,20}$';

export const UserNameValidationPattern: string = '^(?=.*[A-Za-z])[A-Za-z][A-Za-z0-9]{4,20}$';

export const DefaultPaginatorValues: number[] = [10, 25, 50]; 

export const BooleanOptionValues: string[] = ['Yes', 'No'];

export const GovernmentIdTypes: string[] = ['Voter Id', 'Aadhar', 'Pan Card', 'License', 'Passport'];

export const QuarantineTypes: string[] = ['Home', 'Quarantine Center'];

export const DefaultErrorMessage: string = 'Oops! Something went wrong. Please try again.';

export const FileExtension: string[] = ['jpg', 'jpeg', 'png'];