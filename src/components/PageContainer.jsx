import React from 'react';
import { cn } from '../utils/cn';

const PageContainer = ({ children, className }) => {
    return (
        <div className={cn(
            "w-full min-h-[calc(100vh-10rem)] flex justify-center items-center bg-[#F5F5F5] py-8",
            className
        )}>
            {children}
        </div>
    );
};

export default PageContainer;
