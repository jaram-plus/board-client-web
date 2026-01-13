import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, getPostDetail } from '../api/postApi';


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
        <div className="flex justify-between items-center">
          <button className="px-6 py-2 border border-[#E30613] text-[#E30613] rounded hover:bg-[#FFF0F0] font-bold flex items-center gap-2">
            👍 추천
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-[#666] bg-[#F5F5F5] rounded hover:bg-[#E5E5E5]">수정</button>
            <button className="px-4 py-2 text-[#666] bg-[#F5F5F5] rounded hover:bg-[#E5E5E5]">삭제</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetailPage;
