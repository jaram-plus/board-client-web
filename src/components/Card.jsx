import React from 'react';
import { cn } from '../utils/cn';

const Card = ({ children, className, width = 'default' }) => {
    const widthClasses = {
        default: "w-[30rem]",
        wide: "w-[90rem]",
        full: "w-full"
    };

    return (
        <div className={cn(
            "bg-white p-12 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
            widthClasses[width],
            className
        )}>
            {children}
        </div>
    );
};

export default Card;
