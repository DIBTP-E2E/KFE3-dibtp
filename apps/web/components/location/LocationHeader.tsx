const LocationHeader = () => {
  return (
    <div className="w-full max-w-[230px] flex flex-col gap-md mb-4xl">
      <h1 className="font-style-headline-h2">회원님의 위치를 알려주세요</h1>
      <p className="font-style-medium font-medium text-text-info">
        모든 회원은 거래를 위해 사용자 위치를 설정해야합니다.
      </p>
    </div>
  );
};

export default LocationHeader;
