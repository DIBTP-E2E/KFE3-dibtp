import { cn } from '@repo/ui/utils/cn';

interface RegionLabelProps {
  region: string;
}

const RegionLabel = ({ region }: RegionLabelProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'h-[40px] px-md text-text-base border border-border-base rounded-full'
      )}
    >
      {region}
    </div>
  );
};

export default RegionLabel;
