import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/appStore';
import { setForgotPassword, setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';

interface InputFieldProps {
    label: string;
    id: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    isPassword?: boolean;
    forgotPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label, id, placeholder, type, value, onChange, required, isPassword = false, forgotPassword
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
            <div className={`mt-2 ${isPassword ? 'relative' : ''}`}>
                <input
                    id={id}
                    placeholder={placeholder}
                    name={id}
                    type={isPassword ? (passwordVisible ? 'text' : 'password') : type}
                    value={value}
                    onChange={onChange}
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
        </div>
    );
};

export default InputField;