import { Button } from '@repo/ui/components';
interface RegionLabelProps {
  region: string;
}

const RegionLabel = ({ region }: RegionLabelProps) => {
  return (
    <Button size="sm" color="light">
      {region}
    </Button>
  );
};

export default RegionLabel;
