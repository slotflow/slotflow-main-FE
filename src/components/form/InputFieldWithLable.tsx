import React from 'react';

interface InputFiledProps {
    label: string,
    id: string,
    placeholder: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    onForgotPassword?: () => void;
    admin?: boolean;
}

const InputField: React.FC<InputFiledProps> =({
    label, id, placeholder, type, value, onChange, required, onForgotPassword, admin
}) => (
    <div>
        <div className='flex justify-between'>
            <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                {label}
            </label>
        {!admin && id === "password" && onForgotPassword && (
            <label htmlFor="forgotPassword" className='text-xs md:text-sm/6 font-medium text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer' onClick={onForgotPassword}>
                Forgot password?
            </label>
        )}
        </div>
        <div className='mt-2'>
            <input 
                id={id}
                placeholder={placeholder}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
            />
        </div>
    </div>
);

export default InputField;