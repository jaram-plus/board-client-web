import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; // Import Button component

import LogoImage from '../assets/jaram-logo.png'
const Header = () => {
    return (
        <div className="flex w-full flex-col justify-center items-center gap-2.5 border-b-[3px] border-[#EEE] bg-white">
            <header className="flex w-[90rem] p-5 justify-between items-center">
                <div className="shrink-0">
                    <Link to="/jaram/board/posts">
                        <img src={LogoImage} alt="자람 게시판 로고" className="w-20 h-20 shrink-0 aspect-square" />
                    </Link>
                </div>

                <div className="flex items-center gap-1.5 w-[37.5rem] h-[4.1875rem] rounded-[0.625rem] border-[3px] border-[#888] bg-white px-2">
                    <input type="text"
                        placeholder="검색어를 입력하세요"
                        className="flex-1 border-none outline-none text-base bg-transparent px-2"
                    />
                    <button className="w-16 h-full flex justify-center items-center border-none bg-transparent cursor-pointer p-0 group">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[2.2rem] h-[2.2rem] fill-[#555] group-hover:fill-[#E30613]">
                            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-end items-start gap-1.5">
                    <Link to="/login">
                        <Button variant="primary" size="md" className="px-6">로그인</Button>
                    </Link>
                    <Link to="/jaram/board/write">
                        <Button variant="primary" size="md" >글쓰기</Button>
                    </Link>
                </div>
            </header>

            <nav className="flex w-[90rem] px-5 pb-4 gap-8 items-center">
                <Link to="/jaram/board/posts" className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">전체글</Link>
                <Link to="/jaram/board/posts?category=notice" className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">공지사항</Link>
                <Link to="/jaram/board/posts?category=free" className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">자유게시판</Link>
                <Link to="/jaram/board/posts?category=suggestion" className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">건의게시판</Link>
                <Link to="/jaram/board/posts?category=qna" className="text-[#333] no-underline text-xl font-medium transition-colors hover:text-[#E30613] hover:font-bold">Q&A</Link>
            </nav>
        </div>

    );

};
export default Header;