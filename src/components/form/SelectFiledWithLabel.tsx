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
            <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                {label}
            </label>
            <div className='mt-2'>
                <select
                    id={id}
                    value={value.toString()}
                    onChange={handleChange}
                    required={required}
                    className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                >
                    <option value="">Select</option>
                    {options.map((option) => (
                        <option key={option.toString()} value={option.toString()}>
                            {option.toString()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectFiledWithLabel;