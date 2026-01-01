# 자람 게시판 개발 체크리스트

> 이 문서는 Claude Code가 vibe coding 할 때 참고하는 개발 가이드입니다.

## 프로젝트 정보

- **프로젝트명**: 자람 게시판 (Jaram Board)
- **기술 스택**: React 19.2.0 + Vite 7.2.4
- **브랜드 컬러**: `#E30613` (빨강)
- **레이아웃 너비**: 90rem (1440px)

---

## Phase 1: 라우팅 시스템 구축

### 설치
```bash
npm install react-router-dom
```

### 라우트 구조
```
/                    → PostListPage (게시글 목록)
/post/:id            → PostDetailPage (게시글 상세)
/post/write          → PostWritePage (게시글 작성)
/post/edit/:id       → PostEditPage (게시글 수정)
/login               → LoginPage (로그인)
/signup              → SignupPage (회원가입)
/mypage              → MyPage (마이페이지)
/search              → SearchPage (검색 결과)
```

### 작업 체크리스트
- [x] react-router-dom 설치
- [x] App.jsx에 BrowserRouter 설정
- [x] pages/ 디렉토리에 각 페이지 컴포넌트 생성
- [x] Route 설정 완료
- [ ] Header에서 Link 컴포넌트로 변경 (a 태그 → Link)
- [x] 404 NotFound 페이지 추가

---

## Phase 2: API 연동 준비

### 설치
```bash
npm install axios
```

### 파일 구조
```
src/api/
├── axios.config.js      # Axios 인스턴스 (baseURL, interceptor)
├── postApi.js           # 게시글 CRUD API
├── authApi.js           # 로그인/회원가입 API
└── commentApi.js        # 댓글 API
```

### API 엔드포인트 정의

#### 게시글 API
```javascript
GET    /api/posts              // 목록 조회 (페이지네이션)
GET    /api/posts/:id          // 상세 조회
POST   /api/posts              // 작성
PUT    /api/posts/:id          // 수정
DELETE /api/posts/:id          // 삭제
POST   /api/posts/:id/like     // 추천
```

#### 댓글 API
```javascript
GET    /api/posts/:id/comments // 댓글 목록
POST   /api/posts/:id/comments // 댓글 작성
DELETE /api/comments/:id       // 댓글 삭제
```

#### 인증 API
```javascript
POST   /api/auth/login         // 로그인
POST   /api/auth/signup        // 회원가입
POST   /api/auth/logout        // 로그아웃
GET    /api/auth/me            // 현재 사용자 정보
```

### 작업 체크리스트
- [ ] axios 설치
- [ ] axios.config.js 작성 (baseURL, timeout, interceptor)
- [ ] postApi.js 작성
- [ ] authApi.js 작성
- [ ] commentApi.js 작성
- [ ] 에러 핸들링 interceptor 추가

---

## Phase 3: 상태 관리

### 전역 상태 관리 방식 선택
- **Option A**: Context API (간단한 프로젝트)
- **Option B**: Zustand (중간 규모)
- **Option C**: Redux Toolkit (복잡한 프로젝트)

### 관리할 상태

#### 인증 상태
```javascript
{
  isLoggedIn: false,
  user: {
    id: null,
    name: '',
    email: '',
    avatar: ''
  },
  token: null
}
```

#### 게시글 상태
```javascript
{
  posts: [],
  currentPost: null,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null
}
```

### 작업 체크리스트
- [ ] 상태 관리 라이브러리 선택 및 설치
- [ ] AuthContext/Store 생성
- [ ] PostContext/Store 생성
- [ ] Provider를 App.jsx에 적용
- [ ] localStorage에 토큰 저장/불러오기 로직

---

## Phase 4: 페이지별 컴포넌트 개발

### 4.1 게시글 목록 페이지 (PostListPage)

**파일**: `src/pages/PostListPage.jsx`

**기능**:
- [ ] API 연동하여 게시글 목록 가져오기
- [ ] 로딩 상태 표시 (스켈레톤 UI)
- [ ] 에러 처리 및 에러 메시지 표시
- [ ] 페이지네이션 구현
- [ ] 정렬 옵션 (최신순, 인기순, 조회수순)
- [x] 게시글 클릭 시 상세 페이지 이동

**현재 상태**: ✅ 기본 UI 완성, Mock 데이터 사용 중

---

### 4.2 게시글 상세 페이지 (PostDetailPage)

**파일**: `src/pages/PostDetailPage.jsx`

**필요 컴포넌트**:
```
components/post/
├── PostDetail.jsx          # 게시글 본문
├── PostActions.jsx         # 추천/수정/삭제 버튼
├── CommentList.jsx         # 댓글 목록
├── CommentItem.jsx         # 댓글 아이템
└── CommentForm.jsx         # 댓글 작성 폼
```

**기능**:
- [x] URL 파라미터에서 게시글 ID 가져오기
- [ ] 게시글 상세 정보 API 호출
- [x] 제목, 작성자, 작성일, 조회수 표시
- [x] 본문 내용 렌더링 (HTML/Markdown)
- [x] 추천 버튼 (로그인 필요)
- [x] 수정/삭제 버튼 (작성자만 표시)
- [x] 댓글 목록 표시
- [x] 댓글 작성 (로그인 필요)
- [ ] 댓글 삭제 (작성자만)
- [x] 뒤로가기 버튼

**현재 상태**: ✅ 기본 UI 완성, Mock 데이터 사용 중

---

### 4.3 게시글 작성/수정 페이지 (PostWritePage)

**파일**: `src/pages/PostWritePage.jsx`

**필요 컴포넌트**:
```
components/post/
├── PostEditor.jsx          # 에디터 메인
├── TitleInput.jsx          # 제목 입력
└── ContentEditor.jsx       # 본문 에디터
```

**기능**:
- [ ] 로그인 체크 (미로그인 시 로그인 페이지로 리다이렉트)
- [x] 제목 입력 (필수, 최대 100자)
- [x] 본문 입력 (필수, 최소 10자)
- [ ] 카테고리 선택 (선택사항)
- [ ] 이미지 업로드 (선택사항)
- [ ] 미리보기 기능
- [ ] 임시저장 기능 (localStorage)
- [x] 작성 완료 시 상세 페이지로 이동
- [ ] 수정 모드: 기존 데이터 불러오기
- [x] 유효성 검사 및 에러 메시지

**에디터 옵션**:
- **Simple**: textarea ✅ 현재 사용 중
- **Advanced**: React Quill / Toast UI Editor

**현재 상태**: ✅ 기본 UI 완성

---

### 4.4 로그인 페이지 (LoginPage)

**파일**: `src/pages/LoginPage.jsx`

**기능**:
- [x] 이메일/아이디 입력
- [x] 비밀번호 입력
- [x] 유효성 검사 (빈 값, 이메일 형식)
- [ ] 로그인 API 호출
- [ ] 토큰 저장 (localStorage)
- [ ] 사용자 정보 저장 (Context/Store)
- [x] 로그인 성공 시 이전 페이지 또는 메인으로 이동
- [ ] 로그인 실패 시 에러 메시지 표시
- [x] 회원가입 링크

**현재 상태**: ✅ 기본 UI 완성

---

### 4.5 회원가입 페이지 (SignupPage)

**파일**: `src/pages/SignupPage.jsx`

**기능**:
- [x] 이름 입력
- [x] 이메일 입력
- [x] 비밀번호 입력 (최소 8자)
- [x] 비밀번호 확인
- [x] 유효성 검사
- [ ] 회원가입 API 호출
- [x] 가입 성공 시 로그인 페이지로 이동
- [ ] 이미 가입된 이메일 처리
- [x] 로그인 링크

**현재 상태**: ✅ 기본 UI 완성

---

### 4.6 검색 결과 페이지 (SearchPage)

**파일**: `src/pages/SearchPage.jsx`

**기능**:
- [ ] URL 쿼리 파라미터에서 검색어 가져오기 (?q=keyword)
- [ ] 검색 API 호출
- [ ] 검색 결과 목록 표시
- [ ] 결과 없을 때 안내 메시지
- [ ] 검색어 하이라이트
- [ ] 페이지네이션

---

## Phase 5: 공통 컴포넌트 개발

### 5.1 헤더 업그레이드 (Header.jsx)

**현재 위치**: `src/components/Header.jsx`

**개선 사항**:
- [ ] a 태그를 Link 컴포넌트로 변경 (부분 완료 - 버튼은 아직 a 태그)
- [ ] 검색 기능 구현 (검색 시 /search?q=keyword로 이동)
- [ ] 로그인 상태에 따라 버튼 변경 (로그인/로그아웃)
- [ ] 사용자 프로필 표시 (로그인 시)
- [ ] 글쓰기 버튼 클릭 시 /post/write로 이동

**현재 상태**: Header 기본 구조 완성

---

### 5.2 페이지네이션 (Pagenation.jsx)

**현재 위치**: `src/components/Pagenation.jsx`

**기능**:
- [ ] 페이지 번호 버튼 생성 (1, 2, 3, ...)
- [ ] 현재 페이지 하이라이트
- [ ] 이전/다음 버튼
- [ ] 첫 페이지/마지막 페이지 버튼
- [ ] 페이지 번호 클릭 시 콜백 함수 호출
- [ ] URL 쿼리 파라미터와 연동 (?page=2)
- [ ] 최대 표시 페이지 수 제한 (예: 10개)

---

### 5.3 공통 UI 컴포넌트

**생성할 컴포넌트**:
```
src/components/common/
├── Button.jsx              # 재사용 가능한 버튼
├── Input.jsx               # 인풋 필드
├── Loading.jsx             # 로딩 스피너
├── SkeletonPost.jsx        # 게시글 스켈레톤
├── ErrorMessage.jsx        # 에러 메시지
├── Modal.jsx               # 모달 (확인/취소)
└── Toast.jsx               # 토스트 알림
```

**작업 체크리스트**:
- [ ] Button 컴포넌트 (variant: primary, secondary, danger)
- [ ] Input 컴포넌트 (type, placeholder, validation)
- [ ] Loading 스피너
- [ ] SkeletonPost (게시글 로딩 중)
- [ ] ErrorMessage (에러 표시)
- [ ] Modal (삭제 확인 등)
- [ ] Toast 알림 시스템

---

## Phase 6: 인증 시스템

### PrivateRoute 구현

**파일**: `src/components/PrivateRoute.jsx`

**기능**:
- [ ] 로그인 상태 체크
- [ ] 미로그인 시 로그인 페이지로 리다이렉트
- [ ] 이전 경로 저장 (로그인 후 돌아가기)

**적용 대상**:
- 글쓰기 페이지
- 마이페이지
- 게시글 수정 페이지

---

### 토큰 관리

**파일**: `src/utils/tokenManager.js`

**기능**:
- [ ] 토큰 저장 (localStorage)
- [ ] 토큰 불러오기
- [ ] 토큰 삭제
- [ ] 토큰 유효성 검사
- [ ] 자동 로그인 (페이지 로드 시 토큰 확인)

---

## Phase 7: 에러 처리 및 로딩 상태

### 로딩 상태

**구현 위치**:
- [ ] 게시글 목록 로딩 (SkeletonPost 5개 표시)
- [ ] 게시글 상세 로딩 (스켈레톤)
- [ ] 버튼 클릭 시 로딩 (로그인, 게시글 작성)
- [ ] 파일 업로드 로딩 (프로그레스 바)

---

### 에러 처리

**구현 사항**:
- [ ] ErrorBoundary 컴포넌트 생성
- [ ] App.jsx에 ErrorBoundary 적용
- [x] 404 NotFound 페이지
- [ ] 네트워크 에러 메시지
- [ ] API 에러별 메시지 (400, 401, 403, 404, 500)
- [ ] Toast 알림으로 에러 표시

---

## Phase 8: 성능 최적화

### React 최적화

- [ ] PostList 컴포넌트에 React.memo 적용
- [ ] useMemo로 정렬/필터링 최적화
- [ ] useCallback으로 이벤트 핸들러 최적화
- [ ] React.lazy로 Code Splitting (페이지별)
- [ ] 이미지 lazy loading

---

### 데이터 최적화

- [ ] 무한 스크롤 구현 (react-intersection-observer)
- [ ] API 응답 캐싱 (SWR 또는 React Query)
- [ ] 낙관적 업데이트 (추천 버튼)
- [ ] 디바운싱 (검색 입력)

---

## Phase 9: 반응형 디자인

### 브레이크포인트
```css
/* Mobile: ~768px */
/* Tablet: 768px~1024px */
/* Desktop: 1024px~ */
```

### 작업 체크리스트
- [ ] Header 모바일 버전 (햄버거 메뉴)
- [ ] PostList 모바일 레이아웃
- [ ] PostDetail 모바일 레이아웃
- [ ] PostEditor 모바일 최적화
- [ ] Footer 모바일 버전

---

## Phase 10: 추가 기능 (선택)

### 고급 기능
- [ ] 다크 모드 토글
- [ ] 게시글 북마크
- [ ] 드래그 앤 드롭 이미지 업로드
- [ ] Markdown 에디터 (Toast UI Editor)
- [ ] 소셜 공유 버튼 (카카오톡, 트위터)
- [ ] 실시간 알림 (WebSocket)
- [ ] PWA 설정

---

## Phase 11: 테스트

### 설치
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### 작업 체크리스트
- [ ] Button 컴포넌트 테스트
- [ ] PostList 컴포넌트 테스트
- [ ] API 함수 테스트 (mock)
- [ ] 인증 로직 테스트
- [ ] E2E 테스트 (Playwright)

---

## Phase 12: 배포

### 환경 변수 설정

**파일**: `.env`

```bash
VITE_API_BASE_URL=https://api.jaramboard.com
VITE_IMAGE_UPLOAD_URL=https://cdn.jaramboard.com
```

### 작업 체크리스트
- [ ] .env 파일 생성
- [ ] .env.production 생성
- [ ] 빌드 테스트 (npm run build)
- [ ] 빌드 파일 미리보기 (npm run preview)
- [ ] Vercel/Netlify 배포 설정
- [ ] 환경변수 설정 (배포 플랫폼)
- [ ] 도메인 연결
- [ ] CI/CD 파이프라인 (GitHub Actions)

---

## 개발 우선순위

### 🔥 High Priority (먼저 해야 할 것)
1. React Router 설치 및 라우팅 설정
2. Axios 설치 및 API 설정
3. 게시글 상세 페이지 개발
4. 게시글 작성 페이지 개발
5. 로그인/회원가입 페이지 개발
6. API 연동 (백엔드 준비 후)

### 🟡 Medium Priority
7. 검색 기능 구현
8. 댓글 시스템 구현
9. 페이지네이션 완성
10. 에러 처리 및 로딩 상태
11. PrivateRoute 구현

### 🟢 Low Priority (나중에 해도 되는 것)
12. 반응형 디자인
13. 성능 최적화
14. 다크 모드
15. 추가 기능
16. 테스트 코드 작성

---

## 코딩 스타일 가이드

### 컴포넌트 명명 규칙
- 파일명: PascalCase (예: PostList.jsx)
- 컴포넌트명: PascalCase (예: PostList)
- CSS 파일: 컴포넌트와 동일 (예: PostList.css)

### 폴더 구조
```
src/
├── api/              # API 호출 함수
├── assets/           # 이미지, 폰트
├── components/       # 재사용 컴포넌트
│   ├── common/       # 공통 UI
│   ├── post/         # 게시글 관련
│   └── comment/      # 댓글 관련
├── pages/            # 페이지 컴포넌트
├── hooks/            # 커스텀 훅
├── utils/            # 유틸리티 함수
├── context/          # Context API
├── constants/        # 상수
└── styles/           # 공통 스타일
```

### CSS 네이밍
- kebab-case 사용
- BEM 방식 권장
```css
.post-list-item {}
.post-list-item__title {}
.post-list-item--highlighted {}
```

---

## 자주 사용할 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint

# 패키지 설치
npm install [package-name]

# 개발용 패키지 설치
npm install -D [package-name]
```

---

## 참고 링크

- React 공식 문서: https://react.dev
- React Router: https://reactrouter.com
- Axios: https://axios-http.com
- Vite: https://vitejs.dev

---

## 백엔드 API 스펙 (예시)

### 게시글 목록 조회
```
GET /api/posts?page=1&limit=10&sort=latest

Response:
{
  "posts": [...],
  "totalPages": 10,
  "currentPage": 1,
  "totalPosts": 95
}
```

### 게시글 상세 조회
```
GET /api/posts/:id

Response:
{
  "id": 1,
  "title": "제목",
  "content": "본문",
  "author": {...},
  "createdAt": "2025-10-11T00:00:00Z",
  "views": 100,
  "likes": 12,
  "comments": [...]
}
```

### 게시글 작성
```
POST /api/posts
Headers: Authorization: Bearer {token}

Body:
{
  "title": "제목",
  "content": "본문",
  "category": "자유게시판"
}

Response:
{
  "id": 123,
  "message": "게시글이 작성되었습니다."
}
```

---

## 마무리

이 체크리스트는 개발 진행 상황에 따라 계속 업데이트됩니다.
각 단계를 완료할 때마다 체크박스를 체크하세요!

**마지막 업데이트**: 2025-12-29

---

## 📊 현재 진행 상황 요약

### ✅ 완료된 작업 (2025-12-29)

#### Phase 1: 라우팅 시스템 구축
- ✅ react-router-dom 설치 완료
- ✅ App.jsx에 BrowserRouter 설정 완료
- ✅ Route 설정 완료 (/, /post/:id, /post/write, /login, /signup)
- ✅ 404 NotFound 페이지 추가 완료

#### Phase 4: 페이지별 컴포넌트 개발
- ✅ **PostListPage.jsx** - 게시글 목록 페이지 (기본 UI 완성, Mock 데이터)
- ✅ **PostDetailPage.jsx** - 게시글 상세 페이지 (기본 UI 완성, Mock 데이터, 댓글 포함)
- ✅ **PostWritePage.jsx** - 게시글 작성 페이지 (기본 UI 완성, 유효성 검사)
- ✅ **LoginPage.jsx** - 로그인 페이지 (기본 UI 완성)
- ✅ **SignupPage.jsx** - 회원가입 페이지 (기본 UI 완성, 유효성 검사)

#### 생성된 파일 목록
```
src/pages/
├── PostListPage.jsx ✅
├── PostListPage.css ✅
├── PostDetailPage.jsx ✅
├── PostDetailPage.css ✅
├── PostWritePage.jsx ✅
├── PostWritePage.css ✅
├── LoginPage.jsx ✅
├── LoginPage.css ✅
├── SignupPage.jsx ✅
└── SignupPage.css ✅
```

### 🚧 진행 중인 작업
- Header 컴포넌트 Link 변환 (대기 중)

### 📋 다음 단계 (우선순위 순)
1. **Axios 설치 및 API 레이어 구축**
   - axios 설치
   - src/api/ 디렉토리 생성
   - axios.config.js 작성
   - postApi.js, authApi.js, commentApi.js 작성

2. **Header 컴포넌트 업그레이드**
   - Link 컴포넌트로 완전히 전환
   - 검색 기능 활성화

3. **Context API를 통한 인증 상태 관리**
   - AuthContext 생성
   - 로그인/로그아웃 로직 구현

4. **공통 UI 컴포넌트 생성**
   - Loading 스피너
   - Toast 알림
   - Modal 컴포넌트
