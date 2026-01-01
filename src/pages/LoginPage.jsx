import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    // API 호출 (나중에 구현)
    console.log('로그인 시도:', { email, password });

    // 임시: 로그인 성공
    alert('로그인 되었습니다!');
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1>로그인</h1>
          <p>자람 게시판에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-footer">
          <p>
            아직 회원이 아니신가요?
            <Link to="/signup"> 회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
