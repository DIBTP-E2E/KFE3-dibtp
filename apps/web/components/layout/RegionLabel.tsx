interface RegionLabelProps {
  region: string;
}

const RegionLabel = ({ region }: RegionLabelProps) => {
  return (
    <div className="flex items-center justify-center h-12 px-md text-text-base border border-border-base rounded-full">
      {region}
    </div>
  );
};

export default RegionLabel;
