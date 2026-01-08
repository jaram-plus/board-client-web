import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../api/postApi';


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
      <div className="w-full min-h-[calc(100vh-10rem)] flex justify-center items-center bg-[#F5F5F5]">
        <div className="text-center p-16 text-[#888]">
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-10rem)] flex justify-center items-center bg-[#F5F5F5]">
        <div className="text-center p-16">
          <p className="text-[#E30613] mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-[#E30613] text-white rounded hover:bg-[#C00510]"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 게시글이 없을 때
  if (!post) {
    return (
      <div className="w-full min-h-[calc(100vh-10rem)] flex justify-center items-center bg-[#F5F5F5]">
        <div className="text-center p-16 text-[#888]">
          <p>게시글을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-8 py-3 bg-[#E30613] text-white rounded hover:bg-[#C00510]"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    // 페이지 래퍼
    <div className="w-full flex justify-center py-12 bg-[#F5F5F5] min-h-[calc(100vh-10rem)]">
      {/* 메인 컨테이너 */}
      <div className="w-[75rem] bg-white border border-[#EEEEEE] p-10 shadow-sm">

        {/* 뒤로가기 버튼 */}
        <button
          className="mb-8 text-[#666] hover:text-[#333] flex items-center gap-2 font-medium"
          onClick={() => navigate(-1)}
        >
          ← 목록으로
        </button>

        {/* 게시글 헤더 */}
        <div className="border-b border-[#333] pb-6 mb-8">
          <h1 className="text-2xl font-bold text-[#333] mb-4">{post.postTitle}</h1>
          <div className="flex gap-4 text-[#888] text-sm">
            <span className="font-bold text-[#555]">{post.author}</span>
            <span className="text-[#CCC]">|</span>
            <span>{formatDate(post.creationDate)}</span>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="min-h-[20rem] text-[#333] leading-relaxed text-base mb-12 border-b border-[#EEEEEE] pb-12">
          <p className="whitespace-pre-wrap">{post.postContent}</p>
        </div>

        {/* 액션 버튼 (추천, 수정, 삭제) */}
        <div className="flex justify-between items-center mb-12">
          <button className="px-6 py-2 border border-[#E30613] text-[#E30613] rounded hover:bg-[#FFF0F0] font-bold flex items-center gap-2">
            👍 추천
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-[#666] bg-[#F5F5F5] rounded hover:bg-[#E5E5E5]">수정</button>
            <button className="px-4 py-2 text-[#666] bg-[#F5F5F5] rounded hover:bg-[#E5E5E5]">삭제</button>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-[#FAFAFA] p-8 rounded-lg">
          <h3 className="text-lg font-bold text-[#333] mb-6">댓글 ({comments.length})</h3>

          {comments.length === 0 ? (
            <div className="text-center py-8 text-[#888] border-b border-[#EEEEEE] mb-6">
              <p>첫 댓글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mb-8">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white p-4 border border-[#EEEEEE] rounded">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-[#333]">{comment.author}</span>
                    <span className="text-sm text-[#888]">{comment.date}</span>
                  </div>
                  <p className="text-[#555]">{comment.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* 댓글 작성 폼 */}
          <div className="flex gap-2">
            <textarea
              className="flex-1 p-4 border border-[#EEEEEE] rounded resize-none focus:outline-none focus:border-[#E30613]"
              placeholder="댓글 기능은 준비 중입니다..."
              rows="3"
              disabled
            />
            <button className="px-6 bg-[#888] text-white rounded font-bold cursor-not-allowed" disabled>
              등록
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetailPage;
