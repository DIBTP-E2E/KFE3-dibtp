interface NextButtonProps {
  onClick: () => void;
}

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 focus:outline-none bg-transparent text-gray-400"
      aria-label="Next image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
      </svg>
    </button>
  );
};

export default NextButton;
