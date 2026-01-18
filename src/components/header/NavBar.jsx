import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children }) => (
    <Link to={to} className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">
        {children}
    </Link>
);

export const NavBar = () => {
    return (
        <nav className="flex w-[90rem] px-5 pb-4 gap-8 items-center">
            <NavLink to="/jaram/board/posts">전체글</NavLink>
            <NavLink to="/jaram/board/posts?category=notice">공지사항</NavLink>
            <NavLink to="/jaram/board/posts?category=free">자유게시판</NavLink>
            <NavLink to="/jaram/board/posts?category=suggestion">건의게시판</NavLink>
            <NavLink to="/jaram/board/posts?category=qna">Q&A</NavLink>
        </nav>
    );
};
