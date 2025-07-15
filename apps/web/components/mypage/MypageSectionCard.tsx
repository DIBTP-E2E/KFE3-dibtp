import { ReactNode } from 'react';

interface MypageSectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const MypageSectionCard = ({ title, children, className = '' }: MypageSectionCardProps) => {
  return (
    <div className={`bg-bg-light rounded-lg p-md shadow-sm ${className}`}>
      <h2 className="font-style-small text-text-info mb-sm">{title}</h2>
      {children}
    </div>
  );
};

export default MypageSectionCard;
