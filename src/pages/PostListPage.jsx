import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import Pagenation from '../components/Pagenation';
import { formatDate } from '../api/postApi';
import './PostListPage.css';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 게시글 목록 불러오기
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock 데이터 사용 (백엔드 서버가 준비되면 주석 해제)
      const mockData = {
        postList: [
          { postId: 1, postTitle: "자람 게시판에 오신 것을 환영합니다", author: "관리자", creationDate: "2025-12-29T10:00:00" },
          { postId: 2, postTitle: "리액트 컴포넌트 분리하기", author: "신동빈", creationDate: "2025-12-28T14:30:00" },
          { postId: 3, postTitle: "CSS 구조 잡는 법", author: "홍길동", creationDate: "2025-12-27T09:20:00" },
          { postId: 4, postTitle: "프론트엔드 개발자 구합니다", author: "김철수", creationDate: "2025-12-26T16:45:00" },
          { postId: 5, postTitle: "오늘 점심 메뉴 추천", author: "이영희", creationDate: "2025-12-25T12:15:00" },
        ]
      };

      // 실제 API 호출 (백엔드 준비되면 사용)
      // const data = await getPostList();

      const data = mockData;

      if (data && data.postList) {
        setPosts(data.postList);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error('게시글 목록 조회 실패:', err);
      setError('게시글을 불러오는데 실패했습니다.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="post-list-wrapper">
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="post-list-wrapper">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: '#E30613', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={fetchPosts}
            style={{
              padding: '0.8rem 2rem',
              backgroundColor: '#E30613',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 게시글이 없을 때
  if (posts.length === 0) {
    return (
      <div className="post-list-wrapper">
        <div className="post-list-header">
          <div className="post-list-item-content">
            <div className="post-list-item-title">
               <h2>제목</h2>
            </div>
            <div className="post-list-item-infos">
              <span>추천</span>
              <span>작성일</span>
              <span>조회</span>
              <span>댓글</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <p>게시글이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-list-wrapper">

      {/* 리스트 헤더 */}
      <div className="post-list-header">
        <div className="post-list-item-content">
          <div className="post-list-item-title">
             <h2>제목</h2>
          </div>
          <div className="post-list-item-infos">
            <span>추천</span>
            <span>작성일</span>
            <span>조회</span>
            <span>댓글</span>
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <Link
          to={`/post/${post.postId}`}
          key={post.postId}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <PostList
            title={post.postTitle}
            recommend={0}
            date={formatDate(post.creationDate)}
            views={0}
            comments={0}
          />
        </Link>
      ))}

      {/* 페이지네이션 */}
      <Pagenation currentPage={1} totalPages={1} />

    </div>
  );
};

export default PostListPage;
