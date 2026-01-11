import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import Pagenation from '../components/Pagenation';
import { getPostList, formatDate } from '../api/postApi';
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

      // 실제 API 호출
      const data = await getPostList();

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
