import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PostList from '../components/PostList';
import Pagenation from '../components/Pagenation';
import PageTitle from '../components/PageTitle';
import { formatDate } from '../api/postApi';


const PostListPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const boardTitles = {
    notice: '공지사항',
    free: '자유게시판',
    suggestion: '건의게시판',
    qna: 'Q&A',
  };

  const currentTitle = boardTitles[category] || '전체글';

  // 컴포넌트 마운트 시 또는 카테고리 변경 시 게시글 목록 불러오기
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock 데이터 확장
      const allMockData = [
        { postId: 1, category: 'notice', postTitle: "[공지] 자람 게시판 이용 수칙", author: "관리자", creationDate: "2025-12-29T10:00:00" },
        { postId: 2, category: 'free', postTitle: "리액트 컴포넌트 분리하기", author: "신동빈", creationDate: "2025-12-28T14:30:00" },
        { postId: 3, category: 'free', postTitle: "CSS 구조 잡는 법", author: "홍길동", creationDate: "2025-12-27T09:20:00" },
        { postId: 4, category: 'suggestion', postTitle: "게시판 다크모드 추가해주세요", author: "김철수", creationDate: "2025-12-26T16:45:00" },
        { postId: 5, category: 'free', postTitle: "오늘 점심 메뉴 추천", author: "이영희", creationDate: "2025-12-25T12:15:00" },
        { postId: 6, category: 'qna', postTitle: "리액트 라우터 질문있습니다", author: "박지성", creationDate: "2025-12-24T11:00:00" },
        { postId: 7, category: 'notice', postTitle: "[공지] 서버 점검 안내", author: "관리자", creationDate: "2025-12-30T09:00:00" },
      ];

      // 카테고리 필터링
      let filteredPosts = allMockData;
      if (category) {
        filteredPosts = allMockData.filter(post => post.category === category);
      }

      // 최신순 정렬
      filteredPosts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

      setPosts(filteredPosts);
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
    <div className="w-full flex flex-col items-center py-8">
      {/* 게시판 제목 (컴포넌트화) */}
      <PageTitle title={currentTitle} />

      {/* 리스트 헤더 */}
      <div className="w-[90rem] bg-[#F5F5F5] border-t-2 border-[#333] h-12 flex items-center justify-center">
        <div className="w-[75rem] flex justify-between px-4">
          <div className="w-[24rem] shrink-0 pl-2">
            <h2 className="text-base font-normal text-left text-[#333] m-0">제목</h2>
          </div>
          <div className="flex w-[24rem] justify-end items-center gap-6 shrink-0">
            <span className="w-[4.875rem] font-bold text-[#333] text-center text-base">추천</span>
            <span className="w-[4.875rem] font-bold text-[#333] text-center text-base">작성일</span>
            <span className="w-[4.875rem] font-bold text-[#333] text-center text-base">조회</span>
            <span className="w-[4.875rem] font-bold text-[#333] text-center text-base">댓글</span>
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <Link
          to={`/jaram/board/posts/${post.postId}`}
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
