# 게시판 API 문서

## 1. 게시판 글 목록 조회

**설명**: 게시판의 모든 글 목록을 조회합니다.

### Endpoint
- **Method**: GET
- **URL**: `/jaram/board`

### Request
- Query Parameters: 없음
- Request Body: 없음

### Response (200 OK)

| Key | 설명 | Type | Nullable | 예시 |
|-----|------|------|----------|------|
| postList | 게시판 전체 글 목록 | Array | No | - |
| postList[].postId | 게시글 고유 ID | Number | No | 1 |
| postList[].postTitle | 게시글 제목 | String | No | "안녕하세요" |
| postList[].author | 작성자 이름 | String | No | "신동빈" |
| postList[].creationDate | 작성 시간 | String (ISO 8601) | No | "2025-12-22T14:30:00" |

**Response Example**:
```json
{
  "postList": [
    {
      "postId": 1,
      "postTitle": "안녕하세요",
      "author": "신동빈",
      "creationDate": "2025-12-22T14:30:00"
    },
    {
      "postId": 2,
      "postTitle": "게임 재밌는거 추천좀",
      "author": "신동빈",
      "creationDate": "2025-12-22T15:20:00"
    }
  ]
}
```

### Status Codes
- **200**: 성공
- **400**: 잘못된 요청

---

## 2. 게시판 글 상세 조회

**설명**: 특정 게시글의 상세 내용을 조회합니다.

### Endpoint
- **Method**: GET
- **URL**: `/jaram/board/posts`

### Request

**Query Parameters**:

| Key | 설명 | Type | Required | 예시 |
|-----|------|------|----------|------|
| id | 게시글 고유 ID (PK) | Number | Yes | 1 |

**Example Request**:
```
GET /jaram/board/posts?id=1
```

### Response (200 OK)

| Key | 설명 | Type | Nullable | 예시 |
|-----|------|------|----------|------|
| postTitle | 게시글 제목 | String | No | "안녕하세요" |
| postContent | 게시글 내용 | String | No | "반갑습니다!" |
| author | 작성자 이름 | String | No | "신동빈" |
| creationDate | 작성 시간 | String (ISO 8601) | No | "2025-12-22T14:30:00" |

**Response Example**:
```json
{
  "postTitle": "안녕하세요",
  "postContent": "반갑습니다!",
  "author": "신동빈",
  "creationDate": "2025-12-22T14:30:00"
}
```

### Status Codes
- **200**: 성공
- **400**: 잘못된 요청 (예: 존재하지 않는 게시글 ID)

---

## 3. 게시판 글 작성

**설명**: 새로운 게시글을 작성합니다.

### Endpoint
- **Method**: POST
- **URL**: `/jaram/board/post`

### Request

**Headers**:
```
Content-Type: application/json
```

**Request Body**:

| Key | 설명 | Type | Required | 예시 |
|-----|------|------|----------|------|
| postTitle | 게시글 제목 | String | Yes | "안녕하세요" |
| postContent | 게시글 내용 | String | Yes | "처음 작성해봅니다" |

**Request Example**:
```json
{
  "postTitle": "안녕하세요",
  "postContent": "처음 작성해봅니다"
}
```

### Response (200 OK)

| Key | 설명 | Type | Nullable | 예시 |
|-----|------|------|----------|------|
| postId | 생성된 게시글 ID | Number | No | 3 |
| message | 성공 메시지 | String | No | "게시글이 작성되었습니다" |

**Response Example**:
```json
{
  "postId": 3,
  "message": "게시글이 작성되었습니다"
}
```

### Status Codes
- **200**: 게시글 작성 성공
- **400**: 잘못된 요청 (예: 필수 필드 누락, 유효하지 않은 데이터)

---

## 주요 개선 사항

1. **postId 추가**: 목록 조회와 상세 조회를 연결하기 위해 postId 필드 추가
2. **날짜 형식 명시**: ISO 8601 형식으로 명시
3. **Response Body 보완**: 글 작성 API의 응답에 생성된 postId와 메시지 추가
4. **상세 조회 Response 보완**: author, creationDate 필드 추가
5. **Request 형식 명시**: Content-Type 헤더 정보 추가
6. **에러 케이스 설명**: 각 상태 코드에 대한 설명 보완