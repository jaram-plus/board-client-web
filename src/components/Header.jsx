import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { HeaderLogo } from './header/HeaderLogo';
import { SearchBar } from './header/SearchBar';
import { NavBar } from './header/NavBar';

const Header = () => {
    return (
        <div className="flex w-full flex-col justify-center items-center gap-2.5 border-b-[3px] border-[#EEE] bg-white">
            <header className="flex w-[90rem] p-5 justify-between items-center">
                <HeaderLogo />

                <SearchBar />

                <div className="flex justify-end items-start gap-1.5">
                    <Link to="/login">
                        <Button variant="primary" size="md" className="px-6">로그인</Button>
                    </Link>
                    <Link to="/jaram/board/write">
                        <Button variant="primary" size="md" >글쓰기</Button>
                    </Link>
                </div>
            </header>

            <NavBar />
        </div>
    );
};
export default Header;