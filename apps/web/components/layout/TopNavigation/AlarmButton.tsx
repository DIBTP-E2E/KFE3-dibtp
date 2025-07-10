import { Icon } from '@repo/ui/components';

const AlarmButton = () => {
  return (
    <button
      className="flex items-center justify-center w-12 h-12 text-text-base"
      aria-label="알람 확인하기"
    >
      <Icon name="Bell" size="md" />
    </button>
  );
};

export default AlarmButton;
