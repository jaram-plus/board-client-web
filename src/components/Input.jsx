import React from 'react';
import { cn } from '../utils/cn';

const Input = ({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    name,
    error,
    ...props
}) => {
    return (
        <div className={cn("mb-6", className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-base font-bold text-[#333] mb-2"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full p-[0.8rem] border border-[#EEEEEE] rounded text-base focus:outline-none focus:border-[#E30613]",
                    error && "border-[#E30613]"
                )}
                {...props}
            />
            {error && (
                <p className="text-[#E30613] text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
