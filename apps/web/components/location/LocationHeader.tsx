const LocationHeader = () => {
  return (
    <div className="w-full flex flex-col gap-md mb-4xl">
      <h1 className="font-style-headline-h2">
        회원님의 위치를
        <br />
        알려주세요
      </h1>
      <p className="font-style-medium font-medium text-text-info">
        모든 회원은 거래를 위해 위치를 설정해야합니다.
        <br />
        지도에서 위치를 선택해주세요.
      </p>
    </div>
  );
};

export default LocationHeader;
