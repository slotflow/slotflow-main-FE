import { ChangeEvent } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChartConfig } from "@/components/ui/chart";

// **** 1.  Common Response interface
export interface ApiBaseResponse {
  success?: boolean;
  message?: string;
}


// **** 2.  Paginated response api return data interface
export interface ApiPaginatedResponse<T> extends ApiBaseResponse {
  data?: T[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}


// **** 3.  Form data common interface
interface CommonFormFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  role: string;
  verificationToken: string;
}


// **** 4.1  Signup form props type
export type signUpFormProps = Pick<CommonFormFields, "role">;
// **** 4.2  Sign up form FormData type
export type SignUpFormData = Pick<CommonFormFields, "username" | "email" | "password" | "confirmPassword">;



// **** 5.1  Otp verification form useSelector interface
export interface OtpVerificationUseSelector {
  otpRemainingTime: number;
  otpTimerIsRunning: boolean;
  loading: boolean;
  forgotPassword: boolean;
}
// **** 5.2  Otp verification form useSelector type
export type OtpVerificationFormData = Pick<CommonFormFields, "otp">;


// **** 6.1  Login form props interface
export interface LoginFormProps extends Pick<CommonFormFields, "role"> {
  isAdmin?: boolean;
  title: string;
}
// **** 6.2  Login form data type
export type LoginFormData = Pick<CommonFormFields, "email" | "password">;


// **** 7.1  Email verification form props type
export type EmailVerificationFormProps = Pick<CommonFormFields, "role">;
// **** 7.2  Email verification form data type
export type EmailVerificationFormData = Pick<CommonFormFields, "email">;


// **** 8.  Password reset form props type
export type PasswordResetFormDataProps = Pick<CommonFormFields, "password" | "confirmPassword">;


// **** 9.1 Authtication form heading component props interface
export interface AuthFormsHeadingProps {
  title: string;
}
// **** 9.1 Authtication form button component props interface
export interface AuthFormsButtonProps {
  text: string;
  loading: boolean;
}


// **** 10.  InputFieldWithLabel common component props interface
export interface InputFieldProps {
  label?: string;
  id: string;
  placeholder: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  isPassword?: boolean;
  forgotPassword?: boolean;
  onHasError?: (hasError: boolean) => void;
  readonly?: boolean;
}


// **** 11.  SelectFieldWithLabel common component props interface
export interface SelectFieldWithLabelProps {
  label: string;
  id: string;
  value: string | boolean | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | boolean[] | number[] | { label: string; value: string; }[];
  required?: boolean;
  onHasError?: (hasError: boolean) => void;
}


// **** 12.  InfoDisplay component props interface
export interface InfoDisplayComponentRowProps {
  label: string;
  value: string | boolean | number | string[] | Date | undefined | null;
  formatDate?: (dateString: string) => string;
  copyToClipboard?: (text: string) => void;
  link?: boolean;
  isBoolean?: boolean;
  isPrice?: boolean;
  isLast?: boolean;
  isRadioGroup?: boolean;
  selectedRadioValue?: string | null;
  onRadioChange?: (value: string) => void;
  role?: string;
}


// **** 13.  Common button props interface
export interface CommonButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text: string,
  type?: "button" | "submit" | "reset",
  className?: string;
}


// **** 14.  Common role button props interface



// **** 15.  nav compoenents interfaces
export interface SideBarProps {
  routes: Route[];
  filteredRoutes?: Route[];
}


// **** 16.  Constant file interfaces
// **** 16.1  Routes array interface
export interface Route {
  path: string;
  name: string;
}
// **** 16.2  gsap animation object interface
export interface gsapBigSvgYDirectionAnimationProps {
  y: number,
  duration: number,
  yoyo: boolean,
  repeat: number,
  ease: string,
}
// **** 16.3  Header compoenent Navs Array Interface
export interface HeaderCompoenentNavsProps {
  name: string;
  href: string;
  current: boolean;
}


// **** 17.  Common Forms Input handle change function type
export type HandleChangeFunction = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type HandleFeatureChangeFunction = (e: ChangeEvent<HTMLInputElement>, index: number) => void;


// **** 18.  Section one interface
// **** 18.1  Role section Button function interface 
export type HandleRoleSelectionFunction = (url: string) => void;


// **** 19.  Common Table compoenent
export interface CommonTableComponentProps<T> {
  fetchApiFunction: (params?: FetchFunctionParams) => Promise<ApiPaginatedResponse<T>>;
  queryKey: string;
  heading?: string;
  headingClassName?: string;
  column: ColumnDef<T>[];
  columnsCount: number;
  id?: string;
  pageSize?: number;
}


// **** 20.  Api common request parameter interface
export interface FetchFunctionParams<T = string> {
  id?: T;
  pagination?: {
    page: number;
    limit: number;
  };
}


// **** 21.  formate date timeRage Enum
export type TimeRange = "7d"
| "14d"
| "30d"
| "45d"
| "60d"
| "90d"
| "180d"
| "365d"


// **** 22.  dateSelect data interface
export interface dataSelectListItem {
    value: string;
    content: string;
}


// **** 23. role type and plan types
export type Role = "USER" | "PROVIDER" | "ADMIN";
export type LimitedRoles = "ADMIN" | "PROVIDER";
export type limitedPlans = "Starter" | "Professional" | "Enterprise" | "NoSubscription";


// **** 24. AppointmentOverTimeInterface
export interface AppointmentOverTimeInterface {
  completed: number,
  missed: number,
  cancelled: number
}

//  **** 25. Chart Common Interface
export interface ChatComponentProps<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  dataKeyOne: string;
  dataKeyTwo: string;
  dataKeyThree: string;
  nameKey: string;
  chartConfig: ChartConfig;
  isLocked: boolean;
}


// **** 26. Chat Common Interface Base Type
export type BaseChartData = {
  date: string;
  [key: string]: number | string | undefined;
};