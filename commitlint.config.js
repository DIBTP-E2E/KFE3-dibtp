module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서만 변경
        'style', // 코드 포맷팅 등
        'refactor', // 코드 리팩터링
        'perf', // 성능 개선
        'test', // 테스트 코드
        'chore', // 기타 작업 (.gitignore 등)
        'build', // 빌드 관련
        'ci', // CI 관련
        'revert', // 커밋 되돌리기
        'design', // UI 디자인
        'hotfix', // 긴급 수정
        'comment', // 주석 추가/수정
        'rename', // 파일/폴더명 변경
        'remove', // 파일 삭제
        'settings', // 프로젝트 세팅 관련
      ],
    ],
    'subject-empty': [2, 'never'], // 제목 비어있으면 안됨
    'subject-full-stop': [2, 'never', '.'], // 제목이 마침표로 끝나면 안됨
    'header-max-length': [2, 'always', 100], // 전체 헤더 길이 100자 제한
  },
};
