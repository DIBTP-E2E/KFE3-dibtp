# 지역 기반 중고거래 경매 플랫폼

> 실시간 경매 시스템을 활용한 지역 기반 중고 거래 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e)](https://supabase.io/)

## 📋 프로젝트 개요

**실시간 경매 시스템**을 활용한 지역 기반 중고 거래 플랫폼입니다. 사용자의 위치를 기반으로 주변 상품을 추천하고, 실시간 채팅을 통해 원활한 거래 소통을 지원합니다.

### 주요 특징

- 모바일 우선 반응형 디자인
- Kakao Map API를 활용한 위치 기반 서비스
- Supabase를 통한 안정적인 백엔드 인프라

### 개발 진행 단계

- **1차 부트업 (2조, 7일)**: 기본 프로젝트 구조, 초기 설정 및 컴포넌트 구현
- **2차 부트업 (3조, 3일)**: 기본 프로젝트 구조 및 컴포넌트 개선
- **E2E 프로젝트 (5조, 3주)**: MVP 기능 구현 및 배포

## ✨ 주요 기능

### 🔐 사용자 인증 및 계정 관리

- Supabase Auth를 통한 안전한 회원가입/로그인
- 이메일 인증 기반 계정 생성
- 사용자 프로필 관리 및 위치 설정

### 📍 위치 기반 서비스

- Kakao Map API를 활용한 실시간 지도 표시
- 지역별 상품 필터링 및 추천
- 주소 검색 및 자동 완성 기능
- 사용자 위치 기반 거리 계산

### 🛒 상품 관리 시스템

- 직관적인 상품 등록 폼 (제목, 설명, 가격 등)
- 다중 이미지 업로드 및 관리 (Supabase Storage)
- 상품 카테고리 및 태그 시스템
- 상품 목록 조회 및 상세 페이지
- 상품 검색 및 필터링 기능

### 🔨 실시간 경매 시스템

- 하향식 경매 시스템
- 30분마다 단위 가격만큼 입찰가 자동 하락
- 입찰가 하락 타이머 카운트다운
- 현재 입찰가 실시간 업데이트

### 💬 실시간 채팅

- 상품별 채팅방 자동 생성
- 실시간 메시지 송수신
- 채팅 참여자 목록 표시
- 채팅 내역 저장 및 조회

### 📱 사용자 경험

- 모바일 우선 반응형 디자인
- 직관적인 네비게이션 시스템
- 로딩 상태 및 스켈레톤 UI
- 에러 핸들링 및 사용자 피드백

## 🚀 기술 스택

### Frontend

- **Framework**: Next.js v15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **UI Components**: Storybook
- **Form Validation**: Zod

### Backend & Database

- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Server Actions**: Next.js Server Actions

### Development Tools

- **Monorepo**: Turborepo v2
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Lefthook
- **Commit Convention**: Commitlint
- **CI/CD**: Vercel

### External APIs

- **Maps**: Kakao Map API
- **Geocoding**: Kakao Geocoder API

## 🏗️ 프로젝트 구조

```
REPO
├─ apps/
│  ├─ docs/                       # Storybook 문서
│  └─ web/                        # 메인 웹 애플리케이션
│     ├─ app/                     # Next.js App Router
│     │  ├─ (auth-pages)/         # 인증 페이지 (로그인/회원가입)
│     │  ├─ (home)/               # 홈 페이지
│     │  ├─ (pages)/              # 주요 기능 페이지
│     │  └─ api/                  # API 라우트
│     ├─ components/              # 재사용 가능한 컴포넌트
│     ├─ hooks/                   # 커스텀 훅
│     ├─ lib/                     # 라이브러리 설정
│     ├─ services/                # 비즈니스 로직
│     └─ types/                   # TypeScript 타입 정의
└─ packages/
   └─ ui/                        # 공통 UI 컴포넌트 라이브러리
```

## 시작하기

### 1. 환경 설정

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정 (apps/web/.env.local)
# .env.local 파일에 필요한 환경 변수 입력
```

### 2. 개발 서버 실행

```bash
# 루트 위치에서 모든 앱 개발 서버 실행
pnpm run dev

# 또는 개별 앱 실행
cd apps/web && pnpm dev  # 웹 앱 (포트 3001)
```

### 3. 스토리북 실행

```bash
# 모든 스토리북 실행
pnpm run storybook

# 개별 스토리북 실행
pnpm storybook:web  # 웹 앱 스토리북 (포트 6008)
pnpm storybook:ui   # UI 패키지 스토리북
```

## 🔧 주요 명령어

```bash
# 개발 서버 실행
pnpm run dev

# 빌드
pnpm run build

# 코드 품질 검사
pnpm run lint
pnpm run check-types

# 스토리북
pnpm run storybook
```

## 📈 개발 현황 및 로드맵

### 최근 주요 업데이트

- 상품 경매 리스트 및 상세 페이지 구현
- 상품 등록 및 이미지 업로드 기능 완성
- 레이아웃 시스템 및 네비게이션 구현
- UI 컴포넌트 라이브러리 구축
- 데이터베이스 연동 및 배포 환경 설정

### 향후 로드맵

#### Phase 1: 핵심 기능 완성

- [ ] 실시간 경매 시스템 구현
- [ ] 사용자 인증 및 프로필 관리
- [ ] 위치 기반 상품 추천 기능
- [ ] 기본적인 채팅 시스템

#### Phase 2: 고도화 기능

- [ ] 실시간 알림 시스템
- [ ] 상품 검색 및 필터링 고도화
- [ ] 입찰 히스토리 및 통계
- [ ] 사용자 리뷰 시스템

#### Phase 3: 최적화 및 배포

- [ ] 성능 최적화 및 서버 캐싱
- [ ] 모바일 앱 플랫폼 확장 검토
- [ ] 사용자 테스트 및 피드백 수집
- [ ] 상용 서비스 배포 준비

## 👥 개발팀 (5조)

|                                    양명규                                     |                                     임동기                                     |                                    김금란                                     |
| :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                   [@mgYang53](https://github.com/mgYang53)                    |                      [@Jiiker](https://github.com/Jiiker)                      |                 [@goldegg127](https://github.com/goldegg127)                  |
| <img src="https://avatars.githubusercontent.com/u/50770004?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/100774811?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/31915107?v=4" width="100"/> |
