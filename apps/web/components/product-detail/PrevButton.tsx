interface PrevButtonProps {
  onClick: () => void;
}

const PrevButton = ({ onClick }: PrevButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 focus:outline-none bg-transparent text-gray-400"
      aria-label="Previous image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

export default PrevButton;
