import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent } from "react";

// ****************** Common Response ******************
export interface CommonResponse {
  success: boolean;
  message: string;
}





// ****************** Common reusable fields for forms ******************
interface CommonFormFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  role: string;
  verificationToken: string;
}





// ****************** Signup form ******************
// Signup form props
export type signUpProps= Pick<CommonFormFields, "role">;
// Sign up form FormData interface
export type SignUpFormDataProps = Pick<CommonFormFields, "username" | "email" | "password" | "confirmPassword">;





// ****************** Otp verification form ******************
// Signform useSelector interface
export interface SignFormUseSelectorProps {
  otpRemainingTime: number;
  otpTimerIsRunning: boolean;
  loading: boolean;
  forgotPassword: boolean;
}
// Otp verification form data 
export type OtpVerificationFormData = Pick<CommonFormFields, "otp">;





// ****************** Login form ******************
// Login form props interface
export interface LoginFormProp extends Pick<CommonFormFields, "role"> {
  isAdmin?: boolean;
  title: string;
}
export type LoginFormData = Pick<CommonFormFields, "email" | "password">;





// ****************** Reset password form ******************
// Email verification form props
export type EmailVerificationFormProps = Pick<CommonFormFields, "role">;
// Email verification form data
export type EmailVerificationFormData = Pick<CommonFormFields, "email">;





// ****************** Reset password form ******************
// Password reset form FormData interface
export type PasswordResetFormDataProps = Pick<CommonFormFields, "password" | "confirmPassword">;





// ****************** Auth Forms Common Interfaces ******************
// Authentication forms heading props interface used in FormSplit compoenent
export interface AuthFormsHeadingProps {
  title: string;
}

// Authentication forms button props interface used in FormSplit compoenent
export interface AuthFormsButtonProps {
  text: string;
  loading: boolean;
}





// ****************** Input field with label ******************
// Common input field with label compoenents props interface, used in InputFieldWithLabel compoenent
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
}





// ****************** select field with label ******************
// Common select field with label compoenent props interface, used in SelectFieldWithLabel compoenent
export interface SelectFieldProps {
  label: string;
  id: string;
  value: string | boolean | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | boolean[] | number[] | { label: string; value: string; }[];
  required?: boolean;
  onHasError?: (hasError: boolean) => void;
}





// ****************** info display component ******************
// InputDisplay components interface, this is used for showing details in profiles
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
}





// ****************** Common button props interface ******************
export interface CommonButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text: string,
  type?: "button" | "submit" | "reset",
  className?: string;
}





// ****************** Common role button props interface ******************
export interface RoleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}





// ****************** nav compoenents interfaces ******************
// Sidebar compoenent props
export interface SideBarProps {
  routes: Route[];
}





// ****************** Constant file interfaces ******************
// Routes array props
export interface Route {
  path: string;
  name: string;
}
// gsap animation object props
export interface gsapBigSvgYDirectionAnimationProps {
  y: number,
  duration: number,
  yoyo: boolean,
  repeat: number,
  ease: string,
}
// Header compoenent Navs Array Interface
export interface HeaderCompoenentNavsProps {
  name: string;
  href: string;
  current: boolean;
}





// ****************** Common Forms Input handle change function type ******************
export type HandleChangeFunction = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type HandleFeatureChangeFunction = (e: ChangeEvent<HTMLInputElement>, index: number) => void;





// ****************** Section one interface ******************
//  Role section Button function interface 
export type HandleRoleSelectionFunction = (url: string) => void;





// ****************** Common Table compoenent  ******************
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface CommonTableComponentProps<TData, TColumn> {
  fetchApiFunction: (params?: FetchFunctionParams) => Promise<PaginatedResponse<TData>>;
  queryKey: string;
  heading?: string;
  headingClassName?: string;
  column: ColumnDef<TColumn>[];
  columnsCount: number;
  id?: string;
  pageSize?: number;
}









// ****************** Api common request parameter interface ******************
export interface FetchFunctionParams {
  id?: string;
  pagination?: {
    page: number;
    limit: number;
  };
}