# Release v1.0.0

## Release Date
2025-07-08

## Changes

### Features
- product list skeleton UI를 실제 레이아웃과 일치하도록 개선 (#119) (#122) (fa574fd)
- 상품 상세 페이지 route 링크 추가 (#97) (#99) (f285006)
- 레이아웃 컴포넌트 및 네비게이션 시스템 구현 (#83) (918d00a)
- 상품 등록 기능 구현 (#79) (1aefac0)
- vercel 배포 cicd 설정 (#62) (#63) (d4f74a5)
- storybook 토큰 typography.ts 와 스토리 추가 (#47) (f2f24ac)
- storybook에 디자인 토큰 colors.ts 와 컬러 스토리 추가 (#47) (f435095)
- Badge 컴포넌트 개선 & 스토리 수정 (#40) (9cdf875)
- Avatar 스토리 파일 추가 (#43) + index.ts 파일 추가 (40def93)
- Avatar 컴포넌트 추가 (#43) (a117ac0)
- Input 기능 추가(#42) (b423141)
- Input 기능 추가 (#40) (21969c2)
- **create-turbo**: install dependencies (e0170b7)
- **create-turbo**: apply pnpm-eslint transform (865488e)
- **create-turbo**: apply official-starter transform (580fc6a)
- **create-turbo**: install dependencies (1f8a332)
- **create-turbo**: apply pnpm-eslint transform (f068f0e)
- **create-turbo**: apply official-starter transform (cb1b794)

### Bug Fixes
- 상세페이지의 params 를 비동기 await 처리 (#111) (#112) (e40e603)
- 프리즈마 관련 빌드 에러 수정 (#101) (#103) (09a1ded)
- 상품 상세페이지에서 수직 스크롤이 적용되지 않는 이슈 수정 (#96) (#100) (5908d9d)
- 이미지 bucket 변경으로 인해 수정 (#81) (#82) (49ece17)
- bg-neutral 컬러를 bg-base로 수정 (#66) (#67) (a833d7d)
- label 컴포넌트 htmlfor 타입 수정 및 textarea transition 클래스 제거 (#64) (#65) (a83481b)
- 로그인/회원가입 페이지 import 에러 수정 (#23) (#24) (3db2e57)
- 기본 Page 수정 (502cafe)

### Documentation
- readme 전면 개선 및 프로젝트 문서화 강화 (#93) (8fedb8c)
- 리드미 파일에서 팀 이름과 팀원 수정 (#3) (#19) (f7edd84)
- README 문서 수정 (#52) (ceb079d)
- README 문서 업데이트 (#52) - E2E 프로젝트 팀을 위한 리드미 작성 (9210247)

### Settings
- cn.ts 생성 clsx, tailwind-merge 설치 (2d75b22)
- next.js, .prettierrc 추가 (#38) - packages/eslint-config/next.js: next.js 설정 추가 - .prettierignore, .prettierrc: prettier 설정 추가 (4b52d73)
- github issue & pr template 추가 (d48e9e0)

### Refactoring
- 상품 타입 구조 개선 (#121) (f8f26d1)
- 아이콘 컴포넌트 스토리북 경로 수정 (#59) (#60) (dc1763f)
- 스토리북 구조 변경 (#45) (468829b)

### Tests
- README 수정 (#) (0f25e46)

### Chores
- 기존 버셀 빌드 에러 관련 hotfix 롤백 (#116) (e232278)
- Card 컴포넌트 및 스토리 파일 이동 및 경로 수정 (06c6706)
- postcss 설정 변경 (7378ae9)

### Remove
- Input 컴포넌트 삭제 (44d4090)

### Other Changes
- [bug] 폰트 에러 다시 등장하여 next font 설정을 cdn에서 local 폰트로 수정 #98 (#117) (97d29cf)
- [fix] 버셀 빌드 오류 관련 재수정 #113 (#118) (7036720)
- [feat] 모바일 레이아웃 고정값에서 모바일 한정 반응형으로 수정 #88 (#102) (4912712)
- [fix] 홈페이지의 상품리스트 suspense 적용 (#115) (e01ebdc)
- [fix] 빌드 에러 수정 #101 (#110) (afaa261)
- [fix] 빌드 에러 수정 #101 (#109) (d6272d5)
- [fix] 빌드 에러 수정 #101 (#108) (d0575d0)
- [fix] 빌드 에러 수정 #101 (#107) (a8fecf4)
- [fix] 빌드 에러 수정 #101 (#106) (7444289)
- Fix/build error #101 (#105) (d1e4a49)
- [fix] 빌드 에러 수정 #101 (#104) (58c6494)
- [feat] 상품 상세 페이지 서비스 함수 생성 및 데이터 fetch #91 (#95) (46d3a85)
- [docs] Readme.md 업데이트 (#94) (0168eb6)
- [hotfix] 지원하지 않는 next font 최적화 옵션 제거 #89 (#90) (9f8048f)
- [fix] 페이지별 레이아웃이 다른 이슈로 products 페이지 제거 및 메인페이지 직접 적용 #86 (#87) (9f59356)
- [feat] 상품 경매 리스트 기능 구현 #69 (#85) (137e509)
- [feat] 상품 상세 조회 페이지 구현 #22 (#80) (5509d41)
- [feat] 이미지 업로드 및 스토리지 관리 기능 구현 (#75) (9fe818c)
- [feat] Badge 컴포넌트 업데이트 및 ProductBadge 컴포넌트 추가 #77 (#78) (16f0dbc)
- [feat] 버튼 컴포넌트에 rounded props 추가 및 variant와 colors props 분리, 디폴트 값 설정 #72 (#74) (50ccf7c)
- [feat] UI 패키지에 Thumbnail 컴포넌트 생성 #70 (#71) (726df17)
- [feat] 버튼 컴포넌트 생성 (#68) (3bf84d8)
- [feat] prisma client 인스턴스 생성 (#61) (b9ed4f6)
- [fix] UI 패키지에서 런타임에서 절대경로를 읽지 못하는 이슈 해결 (#58) (3d4dce4)
- [chore] ui 패키지 내 절대경로 설정 #54 (#55) (1850cde)
- [feat] 디자인 시스템 아이콘 컴포넌트 추가 #26 (#53) (9ec1e69)
- [feat] prisma 설치 및 세팅 (#51) (578a3a9)
- [bug] Web app에서 UI 패키지의 컴포넌트를 import 할 때 스타일이 적용되지 않는 이슈 해결 #50 (#52) (fdb0d4f)
- [feat] 디자인 시스템 Textarea 컴포넌트 추가 (#46) (4a2d7d2)
- [refactor] 로그인/회원가입 로직 수정 #41 (#47) (db84321)
- [refactor] Input Message와 Label 컴포넌트 공통 수준으로 수정 (#45) (be80829)
- [refact] UI 패키지의 Input 컴포넌트 수정 및 관련 컴포넌트, 훅, 스토리 추가 (#42) (2f773be)
- [refactor] 색상 디자인 토큰 계층 구조의 이름을 Semantic, Scale, Primitive 에서 Utility, Semantic, Primitive 로 수정 #38 (#40) (871d7ea)
- [fix] 기존 ui 패키지 내에 정의된 color 디자인 토큰 스토리 문서 수정 #33 (#37) (f20d2c2)
- [feat] 위치 등록 기능 구현 및 세션 인증 관련 오류 수정 (#36) (0093494)
- [fix] 서버액션 비동기 처리 관련 에러 수정 #28 (#34) (cea525f)
- [refactor] 기존 UI 패키지 컴포넌트를 css in css 형태로 재정의한 토큰 사용하도록 수정 (#31) (70d1e35)
- [chore] turbo run storybook 실행 시 docs app의 스토리북이 실행되도록 설정 #29 (#30) (881d968)
- [fix] ui 패키지에서 정의한 유틸클래스와 토큰이 web app에서 적용되지 않는 문제 해결 #20 (#25) (2efa739)
- [feat] 로그인/회원가입 에러, 리다이렉트 처리 #17 (#21) (c0f366c)
- [chore] web app 절대경로 설정과 import 순서 정의 #16 (#18) (506a072)
- [feat] 디자인 시스템과 tailwindcss 유틸클래스 설정 #13 (#14) (e4a7c1e)
- [feat] 로그인/회원가입 구현 #9 (#15) (cf57b67)
- [chore] 프로젝트 페이지 디렉토리 설정 #11 (#12) (10fc5b5)
- [fix] eslint 가 수정된 파일 위치를 찾지 못하는 이슈를 해결하기 위한 lefthook.yml 파일 수정 #6 (#8) (cec4df5)
- [fix] Noto Sans KR 폰트가 웹에서 반영되지 않는 이슈 수정 #5 (#7) (04bb9cd)
- [setting] 초기 환경 세팅 (#1) (#2) (#4) (8dc9491)
- project rename (f9ea043)
- Update Input.stories.tsx (63ea1df)
- Update Input.tsx (0486346)
- setting: PULL_REQUEST_TEMPLATE 추가 (355e44c)
- github 템플릿 추가 (f771647)
- 글로벌 스타일 추가 (8565206)
- [Remove] web 폴더에 존재하는 stories 삭제 (5968415)
- [Setting] src/style.css를 global.css로 변경 (01c5d8a)
- [Setting] 스토리북 tailwind css 적용 (2cc9dad)
- [Setting] 스토리북 2차 세팅 (3ea3d4f)
- [Setting] 스토리북 1차 세팅 (2c450dc)
- [Setting] turborepo 세팅 (2de3812)
- Fix: 스토리북 수정 안 된 부분 적용 (c6212b5)
- [Fix] - 컴포넌트 className 오타 수정 (8665e74)
- [Fix] : Button 컴포넌트 title props children으로 변경 (f955db5)
- [Fix] - 컴포넌트 props type 수정 (6cb52ae)
- [Feat] - 보통 input 컴포넌트 구현 (569751e)
- [Feat] - Button 공통 컴포넌트 개발 (cf4f76c)
- [Fix] - passwordInput 스토리 기본 매개변수 수정 (6119352)
- [Fix] - 비밀번호 입력 input 분리 (97ceb4a)
- [Feat] - auth 공통 컴포넌트 구현 (8a75376)
- [Fix] 랜덤 아바타 이미지 thumbs로 변경 (98f2464)
- [Feat] Avatar 공통 컴포넌트 개발 완료 (5740ce5)
- [Fix] 모든 변경사항 업데이트 (35ed831)
- [Feat] Badge 공통 컴포넌트 개발 완료 (16b9989)
- [Setting] Tailwind CSS storybook과 연결 작업 완료 (d0b9ac1)
- [Setting] 보일러 플레이트 (1b50ac8)
- [Add] Readme 작성 (e0ab224)
- [Add] Readme 작성 (38ae806)
- Update issue templates (0292dbb)
- Create pull_request_template.md (cd3b518)
- Initial commit (cd3e91a)

## Contributors
- baram55 <asd7973@gmail.com>
- Donggi Lim(Sync) <synclim.dev@gmail.com>
- goldegg127 <goldegg127@gmail.com>
- hojoon07 <ghwns107@naver.com>
- Hyejin <devhyejins@gmail.com>
- Hyejin <hyejin.frontend@gmail.com>
- LeeJnuGoo <leejungoo1396@gmail.com>
- LeeJunGoo <leejungoo1396@gmail.com>
- mgYang53 <50770004+mgYang53@users.noreply.github.com>
- park-chan-hui <fhfh54321@motionimaging.net>
- Seoyoung Park <seokachuu@gmail.com>
- SeoyoungPark(seokachu) <seokachuu@gmail.com>
- Turbobot <turbobot@vercel.com>
- yoonkyung <kyung3098@naver.com>
- YunTaeHo <84884775+YunTaeHo@users.noreply.github.com>
- YunTaeHo <taehoyun0407@gmail.com>
- 박찬희 <fhfh54321@naver.com>
- 젤리 <stay@jelliui-MacBookAir.local>
