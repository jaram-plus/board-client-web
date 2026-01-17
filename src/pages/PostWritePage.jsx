import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postApi';
import Button from '../components/Button'; // Import Button
import Input from '../components/Input'; // Import Input
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';

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
        navigate(`/jaram/board/posts/${response.postId}`);
      } else {
        // postId가 없으면 메인으로 이동
        navigate('/jaram/board/posts');
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
    // 페이지 래퍼
    <PageContainer>
      {/* 작성 컨테이너 */}
      <Card width="wide">
        <h1 className="text-[2rem] text-[#333] mb-8 pb-4 border-b-2 border-[#EEEEEE]">게시글 작성</h1>

        <form onSubmit={handleSubmit}>

          {/* 제목 입력 */}
          <Input
            id="title"
            label="제목"
            placeholder="제목을 입력하세요 (최대 100자)"
            maxLength="100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-8 relative"
          >
            <span className="absolute right-4 bottom-[-1.5rem] text-[#888] text-sm">{title.length}/100</span>
          </Input>

          {/* 본문 입력 */}
          <div className="mb-8 relative">
            <label htmlFor="content" className="block text-[1.1rem] font-bold text-[#333] mb-2">본문</label>
            <textarea
              id="content"
              placeholder="본문을 입력하세요 (최소 10자)"
              rows="20"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-[#EEEEEE] rounded text-base resize-y min-h-[20rem] focus:outline-none focus:border-[#E30613]"
            />
            <span className="absolute right-4 bottom-[-1.5rem] text-[#888] text-sm">{content.length}자</span>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-4 mt-12">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? '작성 중...' : '작성 완료'}
            </Button>
          </div>
        </form>
      </Card>
    </PageContainer>
  );
};

export default PostWritePage;
