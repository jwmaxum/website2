# 🛡️ 관리자 콘솔(Admin Console) 구현 기능 명세서

본 문서는 BEAUTY OF JOSEON 웹사이트의 **관리자 콘솔(Admin Console) 및 CMS 시스템**에 구현된 기능들을 상세히 기록한 명세서입니다.

---

## 1. 🔑 보안 및 인증 시스템 (Authentication & Security)

### 1.1 관리자 로그인 (`/admin/login`)
- **기본 접속 계정**:
  - **아이디 (ID)**: `siteadmin` *(보안을 위해 입력창에 기본값으로 표시되지 않음)*
  - **초기 임시 비밀번호**: `!admin1004`
- **강제 비밀번호 변경 프로세스 (Force Password Reset Modal)**:
  - 최초 임시 비밀번호로 로그인 성공 시 대시보드 직접 접근이 유예되며 화면 전체에 **비밀번호 변경 강제 팝업 모달**이 팝업됩니다.
  - 새 비밀번호 검증 규칙: **6자리 이상**, **영문/숫자/특수기호** 필수 결합.
  - 비밀번호 변경 완료 시 `isPasswordChanged = true` 플래그가 설정되어 정식 접근 세션이 발급됩니다.
- **Web Crypto API (SHA-256 단방향 암호화)**:
  - 브라우저 내장 `window.crypto.subtle.digest('SHA-256', ...)` 비동기 API를 활용하여 비밀번호를 해시값으로 변환한 후 `localStorage`(`admin_password_hash`)에 안전하게 저장합니다. 정보 유출 위험을 근본적으로 차단합니다.

---

## 2. 📊 관리자 대시보드 (`/admin/dashboard`)

- **주요 지표 수치 (KPI Summary)**:
  - 총 방문자 수, 총 매출액, 진행 중인 주문 건수, 등록 상품 수 실시간 요약 카드.
- **최근 활동 및 처리 현황**:
  - 미처리 주문, 신규 문의, 사이트 트래픽 그래프 및 실시간 시스템 상태 모니터링.

---

## 3. ⚙️ 사이트 관리 (`/admin/site` - Site Management)

공개 웹사이트의 주요 정보 및 기능의 노출 여부를 실시간으로 컨트롤하는 제어 센터입니다. 설정값은 `localStorage`에 보관되며 공개 페이지에 즉시 적용됩니다.

### 3.1 쇼핑몰(Shop) 노출 / 비노출 설정 (ON/OFF Toggle)
- 공개 웹사이트 Header 및 내비게이션에서 **Shop 관련 메뉴(제품 카테고리, 베스트 셀러, 장바구니, 주문/결제, 마이페이지)**의 노출 여부를 토글 스위치 하나로 즉시 제어할 수 있습니다.

### 3.2 Company Info 세부 페이지 관리
- **대표이사 인사말 (CEO Message)**:
  - 핵심 헤드라인 문구 및 대표이사 메시지 본문 텍스트 관리.
- **회사개요 (Overview)**:
  - 브랜드 미션(Mission), 설립년도, 임직원 수, 글로벌 지사 수 수치 설정.
- **채용정보 (Careers)**:
  - 채용 현황 요약 및 현재 모집 중인 직무 리스트(줄바꿈 구분) 설정.
- **찾아오시는 길 & 대표 연락처 (Contact Us)**:
  - 회사 주소, 대표 전화번호, 대표 이메일 정보 관리.

---

## 4. 📢 콘텐츠 및 미디어 센터 관리 (`/admin/content`, `/admin/content/new`)

공개 웹사이트의 **Media Center**(`/media`) 페이지에 보여지는 소식과 자료를 종합 관리합니다.

### 4.1 미디어 게시물 관리 목록 (`ContentManagement.tsx`)
- **카테고리 필터링**: `전체`, `공지사항`, `News Room`, `자료실` 탭별 조회.
- **우선순위(Priority) 1~3위 설정**:
  - 드롭다운을 통해 각 게시물의 상단 노출 순위(★ 1위~3위)를 지정 가능.
  - 상위 1~3위로 지정된 게시물은 Media Center 최상단 **Featured Highlights** 영역에 3열 카드로 우선 노출됩니다.
- **검색 및 삭제**: 제목/작성자 실시간 검색 및 게시물 삭제 기능.

### 4.2 신규 콘텐츠 등록 (`ContentRegistration.tsx`)
- **기본 정보 입력**: 게시물 제목, 카테고리 선택(`공지사항`, `News Room`, `자료실`), 상단 노출 순위 지정.
- **HTML / 텍스트 본문 작성**: HTML 태그 및 텍스트를 포함한 풍부한 본문 작성 지원.
- **첨부 자료 및 영상 설정**:
  - **YouTube 영상**: 유튜브 URL 입력 시 자동 변환하여 **자동재생 (`autoplay=1&mute=1`)** 설정 지원.
  - **PDF / 이미지 / 일반 파일**: 문서명 및 다운로드 링크 설정.
- **대표 썸네일 이미지**: 썸네일 Image URL 입력 및 실시간 미리보기 제공.

---

## 5. 🛍️ 상품 관리 (`/admin/products` - Product Management)

- **상품 목록 및 카테고리 관리**:
  - 카테고리별 상품 필터링, 재고 수량 관리, 판매가/할인가 설정.
- **상품 상태 변경**:
  - 판매중, 품절(Out of Stock), 숨김 상태 변경 처리.

---

## 6. 🎨 관리자 레이아웃 (`AdminLayout.tsx`)

- **사이드바 내비게이션 메뉴**:
  - Dashboard, Site Management, Content Management, Product Management, Shopping Mall, Customer Management, System Logs 등 개별 모듈로의 직관적인 이동 지원.
- **헤더 및 사용자 프로필**:
  - 관리자 이름 표시 및 로그아웃(세션 종료) 기능.
