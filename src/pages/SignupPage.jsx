import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button'; // Import Button
import Input from '../components/Input'; // Import Input
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (formData.password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // API 호출 (나중에 구현)
    console.log('회원가입:', formData);

    // 임시: 회원가입 성공
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  return (
    // 페이지 전체 래퍼
    <PageContainer>
      {/* 회원가입 컨테이너 박스 */}
      <Card>

        {/* 헤더: 제목 및 설명 */}
        <div className="text-center mb-8">
          <h1 className="text-[2rem] text-[#333] mb-2 m-0 font-bold">회원가입</h1>
          <p className="text-[#888] text-[0.9rem] m-0">자람 게시판 회원이 되어보세요</p>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
          <Input
            id="name"
            name="name"
            label="이름"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={handleChange}
          />

          {/* 이메일 입력 */}
          <Input
            id="email"
            type="email"
            name="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
          />

          {/* 비밀번호 입력 */}
          <Input
            id="password"
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요 (8자 이상)"
            value={formData.password}
            onChange={handleChange}
          />

          {/* 비밀번호 확인 입력 */}
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />

          {/* 가입 버튼 */}
          <Button type="submit" variant="primary" size="full" className="mt-4">
            회원가입
          </Button>
        </form>

        {/* 푸터: 로그인 링크 */}
        <div className="text-center mt-8 pt-8 border-t border-[#EEEEEE]">
          <p className="text-[#888] text-[0.9rem]">
            이미 회원이신가요?
            <Link to="/login" className="text-[#E30613] no-underline font-bold hover:underline"> 로그인</Link>
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default SignupPage;
