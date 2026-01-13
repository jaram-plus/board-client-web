# macOS에서 Podman 컨테이너와 호스트 localhost 통신 가이드

## 📌 문제 발생

### 상황
- **백엔드 서버**: macOS 호스트 머신에서 `localhost:8080`으로 실행 중
- **프론트엔드**: Podman 컨테이너 내부에서 Vite 개발 서버 실행 중 (`localhost:5173`)
- **문제**: 프론트엔드 컨테이너에서 백엔드 API(`http://localhost:8080`)로 요청 시 연결 실패

### 증상
```
ECONNREFUSED: Connection refused
또는
404 Not Found
```

브라우저 개발자 도구에서 다음과 같은 에러 발생:
- CORS 에러
- 네트워크 연결 실패
- 프록시 에러: `http proxy error: /jaram/board`

---

## 🔍 문제 원인

### 1. macOS의 컨테이너 실행 구조

**Linux (일반 Docker/Podman)**:
```
컨테이너 → localhost → 호스트 머신 ✅
```

**macOS (Docker Desktop / Podman)**:
```
컨테이너 → VM (가상 머신) → localhost → VM 내부만 참조 ❌
       ↓
    호스트 머신의 localhost와 다름!
```

macOS에서 Docker/Podman은 **가상 머신(VM) 위에서 실행**됩니다.
- Linux는 네이티브 커널 기능을 사용하지만, macOS는 VM이 필요
- 컨테이너는 VM 내부에서 실행되므로, 컨테이너의 `localhost`는 **VM의 localhost**를 가리킴
- 호스트 머신(macOS)의 `localhost:8080`과는 **완전히 다른 네트워크 공간**

### 2. 네트워크 격리 문제

```
┌─────────────────────────────────────────┐
│           macOS 호스트 머신              │
│                                         │
│  백엔드 서버: localhost:8080            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      Podman VM (가상 머신)        │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  프론트엔드 컨테이너        │  │  │
│  │  │                             │  │  │
│  │  │  localhost:8080 요청 →     │  │  │
│  │  │  VM 내부 localhost 참조 ❌  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 3. 시도했던 실패한 방법들

#### ❌ 방법 1: `localhost:8080` 직접 사용
```javascript
// axios.config.js
baseURL: 'http://localhost:8080'
```
- **실패 이유**: 컨테이너의 localhost는 VM 내부를 가리킴

#### ❌ 방법 2: `network_mode: "host"` 사용
```yaml
# docker-compose.yml
network_mode: "host"
```
- **실패 이유**: macOS의 Podman은 host 모드를 제대로 지원하지 않음
- **결과**: `https://1.1.1.1/jaram/board`와 같은 이상한 URL로 요청됨

#### ❌ 방법 3: `host.docker.internal` 직접 사용 (설정 없이)
```javascript
// vite.config.js
target: 'http://host.docker.internal:8080'
```
- **실패 이유**: `extra_hosts` 설정 없이는 DNS 해석 불가
- **결과**: `getaddrinfo ENOTFOUND host.docker.internal`

---

## ✅ 문제 해결 방법

### 핵심 개념: `host.docker.internal`

Docker/Podman은 컨테이너에서 호스트 머신에 접근하기 위한 **특수 DNS 이름**을 제공합니다:
- `host.docker.internal` → 호스트 머신의 IP 주소로 자동 해석
- macOS와 Windows에서 기본 지원 (Linux는 별도 설정 필요)

### 해결 전략: Vite 프록시 + host.docker.internal

프론트엔드에서 백엔드로 직접 요청하지 않고, **Vite의 프록시 기능**을 사용하여 우회합니다.

```
브라우저 (localhost:5173)
  ↓
① axios 요청: /jaram/board (같은 origin)
  ↓
② Vite 프록시 (컨테이너 내부)
  ↓
③ host.docker.internal:8080 (호스트 머신)
  ↓
④ 백엔드 서버 응답
  ↓
⑤ 브라우저로 반환 (CORS 문제 없음!)
```

---

## 🚀 실행 단계

### 1단계: docker-compose.yml 설정

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: jaram-board-frontend
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    extra_hosts:
      - "host.docker.internal:host-gateway"  # ⭐ 핵심!
    stdin_open: true
    tty: true
```

**주요 설정 설명**:

| 항목 | 설명 |
|------|------|
| `ports: "5173:5173"` | 컨테이너 포트를 호스트에 노출 |
| `volumes` | 소스 코드 실시간 반영 (Hot Reload) |
| `extra_hosts` | **host.docker.internal을 호스트 게이트웨이로 매핑** |

`extra_hosts`가 하는 일:
```bash
# 컨테이너 내부 /etc/hosts 파일에 추가됨
host.docker.internal → 192.168.65.2 (호스트 IP)
```

### 2단계: vite.config.js 프록시 설정

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',           // 컨테이너 외부 접근 허용
    port: 5173,
    watch: {
      usePolling: true,        // Docker 볼륨에서 파일 감지
    },
    proxy: {
      '/jaram': {                                    // ① 프록시 경로
        target: 'http://host.docker.internal:8080',  // ② 백엔드 주소
        changeOrigin: true,                          // ③ Origin 헤더 변경
        secure: false,                               // ④ HTTPS 검증 비활성화
      },
    },
  },
})
```

**설정 설명**:

| 옵션 | 설명 |
|------|------|
| `/jaram` | 이 경로로 시작하는 요청을 프록시 처리 |
| `target` | 프록시 대상 (호스트 머신의 백엔드) |
| `changeOrigin: true` | 요청 헤더의 Origin을 target으로 변경 |
| `secure: false` | SSL 인증서 검증 비활성화 (개발 환경) |

**동작 원리**:
```
브라우저 요청: http://localhost:5173/jaram/board
         ↓
Vite가 인터셉트: "/jaram"로 시작하는 요청 감지
         ↓
프록시 변환: http://host.docker.internal:8080/jaram/board
         ↓
호스트 머신의 백엔드로 전달
```

### 3단계: axios.config.js 설정

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',  // ⭐ 빈 문자열! (프록시 사용)
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

**왜 `baseURL: ''` 인가?**
- 빈 문자열 = **같은 origin 사용** (http://localhost:5173)
- 프록시가 `/jaram`을 백엔드로 전달
- CORS 문제 발생 안 함 (같은 origin에서 요청)

### 4단계: API 함수 작성

```javascript
// postApi.js
import apiClient from './axios.config';

export const getPostList = async () => {
  const response = await apiClient.get('/jaram/board/');
  return response.data;
};
```

**요청 흐름**:
```
apiClient.get('/jaram/board/')
  ↓
실제 요청 URL: http://localhost:5173/jaram/board/
  ↓
Vite 프록시가 처리
  ↓
변환: http://host.docker.internal:8080/jaram/board/
  ↓
호스트의 백엔드 서버 응답
```

### 5단계: 컨테이너 실행

```bash
# 기존 컨테이너 제거
podman-compose down

# 새로 빌드 및 실행
podman-compose up --build

# 또는 백그라운드 실행
podman-compose up -d --build
```

### 6단계: 테스트

1. **브라우저에서 접속**: `http://localhost:5173`
2. **개발자 도구 (F12) → Network 탭** 열기
3. 게시글 목록 로드 확인
4. **요청 URL 확인**:
   ```
   Request URL: http://localhost:5173/jaram/board/
   Status: 200 OK
   ```

---

## 📊 설정 비교표

| 방법 | baseURL | 프록시 | CORS | 백엔드 수정 | 성공 여부 |
|------|---------|--------|------|------------|-----------|
| localhost 직접 사용 | `http://localhost:8080` | ❌ | 필요 | 필요 | ❌ |
| host 네트워크 모드 | `http://localhost:8080` | ❌ | 필요 | 필요 | ❌ (macOS) |
| **Vite 프록시** | `''` (빈 문자열) | ✅ | **불필요** | **불필요** | ✅ |

---

## 🔧 트러블슈팅

### 문제 1: `ECONNREFUSED` 에러

**원인**: `host.docker.internal`이 해석되지 않음

**해결**:
```yaml
# docker-compose.yml에 추가 확인
extra_hosts:
  - "host.docker.internal:host-gateway"
```

### 문제 2: 404 Not Found

**원인 1**: 백엔드 API 경로 불일치
```javascript
// 백엔드 엔드포인트 확인
curl http://localhost:8080/jaram/board/
```

**원인 2**: 프록시 경로 설정 오류
```javascript
// vite.config.js에서 확인
'/jaram': { ... }  // 이 경로와 API 요청 경로 일치해야 함
```

### 문제 3: 코드 변경이 반영 안됨

**해결**:
```bash
# 컨테이너 재시작
podman-compose restart

# 또는 완전 재빌드
podman-compose down
podman-compose up --build
```

### 문제 4: CORS 에러 (여전히 발생)

**원인**: Vite 프록시가 작동하지 않음

**확인 사항**:
1. `baseURL: ''` (빈 문자열) 확인
2. API 요청이 `/jaram`으로 시작하는지 확인
3. 브라우저에서 요청 URL이 `localhost:5173`인지 확인

---

## 📝 요약

### 핵심 원리

1. **macOS의 컨테이너는 VM에서 실행**되므로 localhost가 호스트와 다름
2. **`host.docker.internal`**을 사용하여 호스트 머신 접근
3. **Vite 프록시**로 같은 origin에서 요청 → CORS 문제 해결
4. **`extra_hosts` 설정**으로 DNS 해석 가능하게 함

### 필수 설정 3가지

| 파일 | 설정 | 목적 |
|------|------|------|
| `docker-compose.yml` | `extra_hosts: host.docker.internal:host-gateway` | 호스트 접근 가능 |
| `vite.config.js` | `proxy: { '/jaram': { target: 'http://host.docker.internal:8080' } }` | 프록시 설정 |
| `axios.config.js` | `baseURL: ''` | 같은 origin 사용 |

### 장점

✅ 백엔드 CORS 설정 불필요
✅ 간단한 프론트엔드 설정만으로 해결
✅ 개발 환경에서 즉시 사용 가능
✅ 프로덕션 환경에서도 동일한 방식 적용 가능

---

## 🎯 결론

macOS에서 Podman 컨테이너와 호스트 localhost 통신은:
1. **`extra_hosts`로 `host.docker.internal` 설정**
2. **Vite 프록시로 백엔드 요청 중계**
3. **axios baseURL을 빈 문자열로 설정**

이 3가지 설정으로 완벽하게 해결됩니다! 🚀
