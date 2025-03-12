import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Validator } from '@/utils/validator';
import { AppDispatch } from '@/utils/redux/appStore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setForgotPassword, setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';

interface InputFieldProps {
    label: string;
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

const InputField: React.FC<InputFieldProps> = ({
    label, id, placeholder, type, value, onChange, required, isPassword = false, forgotPassword, onHasError
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateInput = (inputValue: string) => {
        if (!inputValue) {
            setErrorMessage(null);
            onHasError?.(false);
            return;
        }

        try {
            if (id === 'serviceName') {
                Validator.validateServiceName(inputValue);
            } else if (id === "username") {
                Validator.validateUsername(inputValue);
            } else if (id === "email") {
                Validator.validateEmail(inputValue);
            } else if (id === "password") {
                Validator.validatePassword(inputValue);
            } else if (id === "confirmPassword") {
                Validator.validatePassword(inputValue)
            } else if (id === "otp") {
                Validator.validateOtp(inputValue);
            } else if (id === "phone") {
                Validator.validatePhone(inputValue);
            }
            setErrorMessage(null);
            onHasError?.(false);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        validateInput(e.target.value);
    };

    const handleForgotPassword = () => {
        dispatch(setsignInForm(false));
        dispatch(setForgotPassword(true));
        dispatch(setVerifyEmailForm(true));
        dispatch(setSignUpForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    }

    return (
        <div>
            <div className='flex justify-between'>
                <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    {label}
                </label>
                {forgotPassword && (
                    <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleForgotPassword}>
                        Forgot Password ?
                    </label>
                )}
            </div>
            <div className="mt-2">
                <div className={`relative ${isPassword ? '' : ''}`}>
                    <input
                        id={id}
                        placeholder={placeholder}
                        name={id}
                        type={isPassword ? (passwordVisible ? 'text' : 'password') : type}
                        value={value}
                        onChange={handleInputChange}
                        required={required}
                        className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </button>
                    )}
                </div>
                {errorMessage && (
                    <span className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{errorMessage}</span>
                )}
            </div>
        </div>
    );
};

export default InputField;