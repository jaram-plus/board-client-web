import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostDetail, formatDate } from '../api/postApi';
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 게시글 상세 정보 불러오기
  useEffect(() => {
    fetchPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // 실제 API 호출
      const data = await getPostDetail(id);

      if (data) {
        setPost(data);
      } else {
        setError('게시글을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error('게시글 상세 조회 실패:', err);
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 댓글 기능은 현재 API에 없으므로 Mock 데이터 유지
  const comments = [];

  // 로딩 중
  if (loading) {
    return (
      <div className="post-detail-wrapper">
        <div className="post-detail-container">
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <p>게시글을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="post-detail-wrapper">
        <div className="post-detail-container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#E30613', marginBottom: '1rem' }}>{error}</p>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#E30613',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 게시글이 없을 때
  if (!post) {
    return (
      <div className="post-detail-wrapper">
        <div className="post-detail-container">
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <p>게시글을 찾을 수 없습니다.</p>
            <button
              onClick={() => navigate(-1)}
              style={{
                marginTop: '1rem',
                padding: '0.8rem 2rem',
                backgroundColor: '#E30613',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-wrapper">
      <div className="post-detail-container">

        {/* 뒤로가기 버튼 */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 목록으로
        </button>

        {/* 게시글 헤더 */}
        <div className="post-detail-header">
          <h1>{post.postTitle}</h1>
          <div className="post-detail-meta">
            <span className="author">{post.author}</span>
            <span className="date">{formatDate(post.creationDate)}</span>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="post-detail-content">
          <p style={{ whiteSpace: 'pre-wrap' }}>{post.postContent}</p>
        </div>

        {/* 액션 버튼 */}
        <div className="post-detail-actions">
          <button className="like-button">👍 추천</button>
          <div className="post-control-buttons">
            <button className="edit-button">수정</button>
            <button className="delete-button">삭제</button>
          </div>
        </div>

        {/* 댓글 섹션 (현재 API에 없음) */}
        <div className="comment-section">
          <h3>댓글 ({comments.length})</h3>

          {comments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              <p>첫 댓글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="comment-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* 댓글 작성 폼 (기능 미구현) */}
          <div className="comment-form">
            <textarea
              placeholder="댓글 기능은 준비 중입니다..."
              rows="4"
              disabled
            />
            <button className="comment-submit" disabled>댓글 작성</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetailPage;
