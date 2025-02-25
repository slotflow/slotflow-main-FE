import React from 'react';

interface InputFiledProps {
    label: string,
    id: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    onForgotPassword?: () => void;
}

const InputField: React.FC<InputFiledProps> =({
    label, id, type, value, onChange, required, onForgotPassword
}) => (
    <div>
        <div className='flex justify-between'>
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
        {id === "password" && onForgotPassword && (
            <label htmlFor="forgotPassword" className='font-medium text-indigo-400 hover:text-indigo-600 cursor-pointer'>
                Forgot password?
            </label>
        )}
        </div>
        <div className='mt-2'>
            <input 
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
        </div>
    </div>
);

export default InputField;