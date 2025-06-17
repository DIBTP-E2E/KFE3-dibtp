module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 수정
        'settings', // 프로젝트 세팅 관련
        'refactor', // 코드 리팩토링
        'test', // 테스트 코드 추가/리팩토링
        'chore', // 패키지 매니저 등 기타 수정
        'design', // 사용자 UI 디자인 변경
        'comment', // 주석 추가 또는 수정
        'rename', // 파일/폴더명 변경
        'remove', // 파일 삭제
      ],
    ],
    'subject-empty': [2, 'never'], // 제목 비어있으면 안됨
    'subject-full-stop': [2, 'never', '.'], // 제목이 마침표로 끝나면 안됨
    'header-max-length': [2, 'always', 100], // 전체 헤더 길이 100자 제한
  },
};
