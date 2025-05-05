import { ChangeEvent } from "react";

// Common Response Type
export interface CommonResponse {
    success: boolean;
    message: string;
}

// InputDisplay components interface, this is used for showing details in profiles
export interface InfoDisplayComponentRowProps {
    label: string;
    value: string | boolean | number | string[] | Date | undefined | null;
    formatDate?: (dateString: string) => string;
    copyToClipboard?: (text: string) => void;
    link?: boolean;
    isBoolean?: boolean;
    isPrice? : boolean;
}



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


// **** Common role button props interface, used in RoleButton compoenent **** \\
export interface RoleButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}



// **** Common button props interface **** \\
export interface CommonButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    text: string,
    type?: "button" | "submit" | "reset",
}


// **** Common sidebar compoenent props interface **** \\
export interface Route {
    path: string;
    name: string;
}

export interface SideBarProps {
    routes: Route[];
}




// **** SignUp form Interfaces **** \\
// SignUp form Interface
export interface signUpProps {
    role: string;
}

// Sign up form FormData interface
export interface SignUpFormDataProps {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}



// **** Loogin Form Interfaces **** \\
// Login form props interface
export interface LoginFormProp {
    isAdmin?: boolean;
    role: string;
    title: string;
}


// **** Eamil verification form interfaces **** \\
// Email verification FormData interface
export interface EmailVerificationFormDataProps {
    email: string;
 }



//  **** Password reset form interfaces **** \\
// Password reset form FormData interface
export interface PasswordResetFormDataProps {
    password: string;
    confirmPassword: string;
}



// **** Auth Forms Common Interfaces **** \\
// Authentication forms heading props interface used in FormSplit compoenent
export interface AuthFormsHeadingProps {
    title: string;
}

// Authentication forms button props interface used in FormSplit compoenent
export interface AuthFormsButtonProps {
    text: string;
    loading: boolean;
}



// ****  Common Forms Input handle change function type **** \\
export type HandleChangeFunction = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type HandleFeatureChangeFunction = (e: ChangeEvent<HTMLInputElement>, index: number) => void;



// **** Header compoenent Navs Array Interface **** \\
export interface HeaderCompoenentNavsProps {
    name: string;
    href: string;
    current: boolean;
}



// **** Section one interface **** \\
//  Role section Button function interface 
export type HandleRoleSelectionFunction = (url: string) => void;



// **** Otp verification form Interfaces **** \\\\
// Signform useSelector interface
export interface SignFormUseSelectorProps {
    otpRemainingTime: number;
    otpTimerIsRunning: boolean;
    loading: boolean;
    forgotPassword: boolean;
}
