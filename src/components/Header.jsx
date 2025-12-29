import React from 'react';
import './Header.css';

import LogoImage from '../assets/jaram-logo.png'
const Header = () => {
    return (
        <div className="header-container-outer">
            <header className="header-container-inner">
            <div className="header-logo"><img src={LogoImage} alt="자람 게시판 로고"/></div>

            <div className = "header-search-box">
                <input type="text" 
                placeholder="검색어를 입력하세요" 
                />
                <button className="search-button">🔍</button>
            </div>

            <div className="auth-buttons">
                <button className="btn btn-primary">로그인</button>
                <button className="btn btn-primary">글쓰기</button>
            </div>
        </header>
        </div>
        
    );
    
};
export default Header;