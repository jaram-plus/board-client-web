import React from 'react';
import './PostList.css'; // 아까 그 CSS 파일 연결

// 부모에게서 title, date 같은 데이터를 'props'로 받아옵니다.
const PostList = ({ title, recommend, date, views, comments }) => {
  return (
    <div className="post-list-item">
      <div className="post-list-item-content">
        
        {/* 제목 영역 */}
        <div className="post-list-item-title">
          <h2>{title}</h2>
        </div>
        
        {/* 정보 영역 (추천, 날짜, 조회, 댓글) */}
        <div className="post-list-item-infos">
          <span>{recommend}</span>
          <span>{date}</span>
          <span>{views}</span>
          <span>{comments}</span>
        </div>

      </div>
    </div>
  );
};

export default PostList;