import TinyComponent from './TinyComponent';

const AnotherComponent = () => {
  return (
    <article>
      <h2>AnotherComponent 는 TinyComponent의 조합</h2>
      <TinyComponent />
    </article>
  );
};

export default AnotherComponent;
