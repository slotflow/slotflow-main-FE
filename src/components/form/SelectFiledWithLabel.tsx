import { ChangeEvent } from 'react';

interface SelectFieldProps {
    label: string;
    id: string;
    value: string | boolean | number;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[] | boolean[] | number[];
    required?: boolean;
    onHasError?: (hasError: boolean) => void;
}

const SelectFiledWithLabel: React.FC<SelectFieldProps> = ({
    label,
    id,
    value,
    onChange,
    options,
    required = false,
    onHasError,
}) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
        if (onHasError) {
            onHasError(!e.target.value && required);
        }
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                value={value.toString()}
                onChange={handleChange}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                {options.map((option) => (
                    <option key={option.toString()} value={option.toString()}>
                        {option.toString()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFiledWithLabel;