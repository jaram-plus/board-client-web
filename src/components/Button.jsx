import React from 'react';
import { cn } from '../utils/cn';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false
}) => {

    const baseStyles = "flex justify-center items-center gap-2.5 font-['Inter'] font-normal leading-normal rounded-[0.625rem] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none";

    const variants = {
        primary: "bg-[#E50113] text-white hover:bg-[#C00000] hover:-translate-y-[2px]",
        secondary: "bg-white text-[#666] border border-[#ddd] hover:bg-[#f9f9f9]",
        text: "bg-transparent text-[#333] hover:text-[#E30613] p-0 font-medium hover:font-bold"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        // 수정됨: p-2.5 -> px-5 py-2.5 (좌우 여백을 늘림)
        md: "px-5 py-2.5 text-[0.9375rem]",
        lg: "px-6 py-3 text-base",
        full: "w-full py-4 text-base"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
            {children}
        </button>
    );
};

export default Button;