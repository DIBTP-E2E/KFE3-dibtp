interface ImageCounterProps {
  currentIndex: number;
  totalImages: number;
}

const ImageCounter = ({ currentIndex, totalImages }: ImageCounterProps) => {
  return (
    <div className="absolute bottom-4 right-4 px-3 py-1 text-sm bg-transparent text-gray-400">
      {currentIndex + 1} / {totalImages}
    </div>
  );
};

export default ImageCounter;
