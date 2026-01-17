import React from 'react';
// import PostItem from './PostItem'; // 컴포넌트 없음
// import './PostPage.css'; // Tailwind로 대체

const PostPage = () => {
  // 가짜 데이터
  const posts = [
    { id: 1, title: "제목1-111111111111111111111", recommend: 12, date: "2025.10.11", views: 100, comments: 10 },
    { id: 2, title: "리액트 컴포넌트 분리하기", recommend: 5, date: "2025.10.12", views: 45, comments: 2 },
    { id: 3, title: "CSS 구조 잡는 법", recommend: 0, date: "2025.10.13", views: 12, comments: 0 },
    { id: 4, title: "프론트엔드 개발자 구합니다", recommend: 20, date: "2025.10.14", views: 300, comments: 25 },
    { id: 5, title: "오늘 점심 메뉴", recommend: 1, date: "2025.10.15", views: 55, comments: 5 },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      {/* 1. 리스트 헤더 (제목 줄) */}
      <div className="bg-[#F5F5F5] border-t-2 border-[#333] h-12 w-full flex justify-center">
        <div className="w-[90rem] flex justify-between items-center px-4">
          <div className="w-[24rem] pl-2">
            <h2 className="text-base font-bold text-center m-0">제목</h2>
          </div>
          <div className="flex w-[24rem] justify-end items-center gap-6">
            <span className="font-bold text-[#333]">추천수</span>
            <span className="font-bold text-[#333]">작성일</span>
            <span className="font-bold text-[#333]">조회수</span>
            <span className="font-bold text-[#333]">댓글수</span>
          </div>
        </div>
      </div>

      {/* 2. 실제 게시글들 (Map으로 PostItem 반복) */}
      {posts.map((post) => (
        // <PostItem 
        //   key={post.id}
        //   title={post.title}
        //   recommend={post.recommend}
        //   date={post.date}
        //   views={post.views}
        //   comments={post.comments}
        // />
        <div key={post.id} className="p-4 border-b border-[#eee]">
          {/* PostItem 대용 임시 표시 */}
          {post.title}
        </div>
      ))}

    </div>
  );
};

export default PostPage;