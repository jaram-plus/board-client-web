import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/jaram-logo.png';

export const HeaderLogo = () => {
    return (
        <div className="shrink-0">
            <Link to="/jaram/board/posts">
                <img src={LogoImage} alt="자람 게시판 로고" className="w-20 h-20 shrink-0 aspect-square" />
            </Link>
        </div>
    );
};
