import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postApi';
import './PostWritePage.css';

const PostWritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim() || content.length < 10) {
      alert('본문을 10자 이상 입력해주세요.');
      return;
    }

    // API 호출
    try {
      setIsSubmitting(true);

      const response = await createPost({
        title: title.trim(),
        content: content.trim()
      });

      // API 응답: { postId, message }
      alert(response.message || '게시글이 작성되었습니다!');

      // 작성된 게시글 상세 페이지로 이동
      if (response.postId) {
        navigate(`/post/${response.postId}`);
      } else {
        // postId가 없으면 메인으로 이동
        navigate('/');
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate(-1);
    }
  };

  return (
    <div className="post-write-wrapper">
      <div className="post-write-container">
        <h1>게시글 작성</h1>

        <form onSubmit={handleSubmit}>
          {/* 제목 입력 */}
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="제목을 입력하세요 (최대 100자)"
              maxLength="100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="char-count">{title.length}/100</span>
          </div>

          {/* 본문 입력 */}
          <div className="form-group">
            <label htmlFor="content">본문</label>
            <textarea
              id="content"
              placeholder="본문을 입력하세요 (최소 10자)"
              rows="20"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <span className="char-count">{content.length}자</span>
          </div>

          {/* 버튼 */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '작성 중...' : '작성 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostWritePage;
