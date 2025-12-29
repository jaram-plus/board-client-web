import React from 'react';
import PostItem from './PostItem';
import './PostPage.css';

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
    <div className="post-list-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1. 리스트 헤더 (제목 줄) */}
      {/* 헤더는 디자인이 미묘하게 달라서(굵은 글씨 등) 보통 따로 둡니다 */}
      <div className="post-list-item" style={{ backgroundColor: '#F5F5F5', borderTop: '2px solid #333', height: '3rem' }}>
        <div className="post-list-item-content">
          <div className="post-list-item-title">
             <h2 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>제목</h2>
          </div>
          <div className="post-list-item-infos">
            <span style={{ fontWeight: 'bold', color: '#333' }}>추천수</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>작성일</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>조회수</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>댓글수</span>
          </div>
        </div>
      </div>

      {/* 2. 실제 게시글들 (Map으로 PostItem 반복) */}
      {posts.map((post) => (
        <PostItem 
          key={post.id}
          title={post.title}
          recommend={post.recommend}
          date={post.date}
          views={post.views}
          comments={post.comments}
        />
      ))}
      
    </div>
  );
};

export default PostPage;