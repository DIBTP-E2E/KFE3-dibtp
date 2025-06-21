import TinyComponent from './TinyComponent';

const SomeComponent = () => {
  return (
    <article>
      <h2>SomeComponent 는 TinyComponent의 조합</h2>
      <TinyComponent />
    </article>
  );
};

export default SomeComponent;
