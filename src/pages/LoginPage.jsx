import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button'; // Import Button

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
    // 페이지 전체 래퍼 (배경, 정렬)
    <div className="w-full min-h-[calc(100vh-10rem)] flex justify-center items-center bg-[#F5F5F5] py-8">

      {/* 로그인 컨테이너 박스 */}
      <div className="w-[30rem] bg-white p-12 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">

        {/* 헤더: 제목 및 설명 */}
        <div className="text-center mb-8">
          <h1 className="text-[2rem] text-[#333] mb-2 m-0 font-bold">로그인</h1>
          <p className="text-[#888] text-[0.9rem] m-0">자람 게시판에 오신 것을 환영합니다</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-base font-bold text-[#333] mb-2">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[0.8rem] border border-[#EEEEEE] rounded text-base focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-base font-bold text-[#333] mb-2">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[0.8rem] border border-[#EEEEEE] rounded text-base focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* 로그인 버튼 */}
          <Button type="submit" variant="primary" size="full" className="mt-4">
            로그인
          </Button>
        </form>

        {/* 푸터: 회원가입 링크 */}
        <div className="text-center mt-8 pt-8 border-t border-[#EEEEEE]">
          <p className="text-[#888] text-[0.9rem]">
            아직 회원이 아니신가요?
            <Link to="/signup" className="text-[#E30613] no-underline font-bold hover:underline"> 회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
