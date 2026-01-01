import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 주소 (환경에 맞게 수정)
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 처리 (예: 토큰 추가)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('API 요청:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error('응답 에러:', error.response.status, error.response.data);

      // 알림 대신 콘솔에만 로그 출력
      // 각 컴포넌트에서 에러 처리하도록 함
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error('응답 없음:', error.request);
      console.error('백엔드 서버가 실행되지 않았거나 연결할 수 없습니다.');
    } else {
      // 요청 설정 중 오류 발생
      console.error('요청 설정 에러:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
