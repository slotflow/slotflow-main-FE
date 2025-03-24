import React, { useState, useRef, useEffect, memo } from 'react';
import { SelectFieldProps } from '@/utils/interface/commonInterface';

const SelectFiledWithLabel: React.FC<SelectFieldProps> = memo(({
    label,
    id,
    value,
    onChange,
    options,
    required = false,
    onHasError,
}) => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(value.toString());
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelect = (optionValue: string) => {
        setSelectedValue(optionValue);
        const event = {
            target: {
                id: id,
                value: optionValue,
                type: 'select-one',
            },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
        setIsOpen(false);
        if (onHasError) {
            onHasError(!optionValue && required);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={selectRef}>
            <label htmlFor={id} className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                {label}
            </label>
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-md bg-[var(--inputBg)] px-3 py-1.5 text-smring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border border-[var(--boxBorder)] mt-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedValue || "Select"}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75 7.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                    <ul className="max-h-56 overflow-y-auto py-1">
                        {options.map((option) => (
                            <li
                                key={option.toString()}
                                className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${selectedValue === option.toString() ? 'bg-gray-200' : ''}`}
                                onClick={() => handleSelect(option.toString())}
                            >
                                {option.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SelectFiledWithLabel;