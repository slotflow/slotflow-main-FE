// InputDisplay components interface, this shimmer is used for showing details in profiles
export interface InfoDisplayComponentRowProps {
    label: string;
    value: string | boolean | undefined;
    formatDate?: (dateString: string) => string;
    copyToClipboard?: (text: string) => void;
    link?: boolean;
    isBoolean?: boolean;
}


// Data fetching error compoenent interface, used for showing a good error compoenent with message in details showing page if there is any error
export interface dataFetchingError {
    message: string;
}


// Login form props interface
export interface LoginFormProp {
    isAdmin?: boolean;
    role: string;
    title: string;
}


// Sign up form props interface
export interface signUpProps {
    role: string;
}


// Authentication forms heading props interface used in FormSplit compoenent
export interface AuthFormsHeadingProps {
    title: string;
}


// Authentication forms button props interface used in FormSplit compoenent
export interface AuthFormsButtonProps {
    text: string;
    loading: boolean;
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
    options: string[] | boolean[] | number[];
    required?: boolean;
    onHasError?: (hasError: boolean) => void;
}


// Common role button props interface, used in RoleButton compoenent
export interface RoleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}


// Common sidebar compoenent props interface, used in sidebar compoenent
export interface Route {
    path: string;
    name: string;
}

export interface SideBarProps {
    routes: Route[];
}