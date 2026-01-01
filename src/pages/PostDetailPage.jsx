import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../api/postApi';
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

      // Mock 데이터 사용 (백엔드 서버가 준비되면 주석 해제)
      const mockPosts = {
        1: { postTitle: "자람 게시판에 오신 것을 환영합니다", postContent: "안녕하세요! 자람 게시판에 오신 것을 환영합니다.\n\n이곳은 자람 동아리 회원들이 자유롭게 소통하고 정보를 공유하는 공간입니다.\n\n많은 활동 부탁드립니다!", author: "관리자", creationDate: "2025-12-29T10:00:00" },
        2: { postTitle: "리액트 컴포넌트 분리하기", postContent: "리액트에서 컴포넌트를 효과적으로 분리하는 방법에 대해 공유합니다.\n\n1. 재사용 가능한 단위로 분리\n2. 단일 책임 원칙 적용\n3. Props를 통한 데이터 전달\n\n여러분의 의견도 들려주세요!", author: "신동빈", creationDate: "2025-12-28T14:30:00" },
        3: { postTitle: "CSS 구조 잡는 법", postContent: "CSS 구조를 체계적으로 관리하는 방법을 소개합니다.\n\n- BEM 방법론 사용\n- CSS 모듈화\n- 변수 활용\n\n좋은 CSS 구조는 유지보수를 쉽게 만들어줍니다.", author: "홍길동", creationDate: "2025-12-27T09:20:00" },
        4: { postTitle: "프론트엔드 개발자 구합니다", postContent: "스타트업에서 프론트엔드 개발자를 모집합니다.\n\n자격 요건:\n- React 경험 1년 이상\n- TypeScript 사용 가능\n- 팀워크 중시\n\n관심 있으신 분은 연락 주세요!", author: "김철수", creationDate: "2025-12-26T16:45:00" },
        5: { postTitle: "오늘 점심 메뉴 추천", postContent: "오늘 점심 뭐 먹을지 고민되시나요?\n\n추천 메뉴:\n1. 김치찌개\n2. 돈까스\n3. 비빔밥\n\n여러분의 추천도 댓글로 남겨주세요!", author: "이영희", creationDate: "2025-12-25T12:15:00" }
      };

      // 실제 API 호출 (백엔드 준비되면 사용)
      // const data = await getPostDetail(id);

      const data = mockPosts[id];

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
