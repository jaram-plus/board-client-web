import React from 'react';

const PageTitle = ({ title }) => {
    return (
        <h1 className="w-[90rem] text-3xl font-bold text-primary mb-24 text-left">
            {title}
        </h1>
    );
};

export default PageTitle;
