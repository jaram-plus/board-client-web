import apiClient from './axios.config';

/**
 * 게시판 API
 *
 * API 문서 기반:
 * 1. GET /jaram/board - 게시글 목록 조회
 * 2. GET /jaram/board/posts?id={post_id} - 게시글 상세 조회
 * 3. POST /jaram/board/post - 게시글 작성
 */

// 1. 게시글 목록 조회
export const getPostList = async () => {
  try {
    const response = await apiClient.get('/jaram/board/');
    return response.data; // { postList: [...] }
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

// 2. 게시글 상세 조회
export const getPostDetail = async (postId) => {
  try {
    const response = await apiClient.get('/jaram/board/posts', {
      params: { id: postId }
    });
    return response.data; // { postTitle, postContent, author, creationDate }
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

// 3. 게시글 작성
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/jaram/board/post', {
      postTitle: postData.title,
      postContent: postData.content
    });
    return response.data; // { postId, message }
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    throw error;
  }
};

// 추가: 날짜 포맷 유틸리티 함수
export const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error('날짜 포맷 변환 실패:', error);
    return dateString;
  }
};
