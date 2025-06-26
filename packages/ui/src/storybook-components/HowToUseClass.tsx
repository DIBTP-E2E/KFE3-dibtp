import HowToUse from "./HowToUse";

const HowToUseClass = () => (
  <HowToUse
    title='💡 토큰 기준 유틸클래스 생성 규칙'
    datas={[
        {name: '배경색 토큰', code: '--color-bg-*'},
        {name: '배경색 유틸클래스', code: 'bg-bg-*'},
        {name: 'text 색상 토큰', code: '--color-text-*'},
        {name: 'text 색상 유틸클래스', code: 'text-text-*'},
        {name: 'border 색상 토큰', code: '--color-border-*'},
        {name: 'border 색상 유틸클래스', code: 'border-border-*'},
  ]} />
);

export default HowToUseClass;
