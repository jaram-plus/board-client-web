import React from 'react';
// import './Footer.css'; // Tailwind로 대체

const Footer = () => {
    return (
        <footer className="w-full h-[12.5rem] flex justify-center items-center bg-[#EEE] p-0">
            <div className="w-[90rem] flex flex-col items-start gap-3 px-5">
                <span className="text-[#7B7979] text-center font-['Inter'] text-xl font-normal not-italic leading-normal">Copyright 2025. Team JaramPlus. All rights reserved.</span>
                <span className="text-[#7B7979] text-center font-['Inter'] text-xl font-normal not-italic leading-normal">Contact: Jaram@university.ac.kr</span>
                <span className="text-[#7B7979] text-center font-['Inter'] text-xl font-normal not-italic leading-normal">개인정보처리방침 | 이용약관</span>
            </div>
        </footer>

    );

};
export default Footer;