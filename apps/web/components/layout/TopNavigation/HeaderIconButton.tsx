import { IconButton } from '@/components/shared';

type IconButtonProps = React.ComponentProps<typeof IconButton>;
type HeaderIconButtonProps = Omit<IconButtonProps, 'variant' | 'color'>;

const HeaderIconButton = ({ iconName, ariaLabel, ...restProps }: HeaderIconButtonProps) => {
  return (
    <IconButton
      iconName={iconName}
      ariaLabel={ariaLabel}
      variant="bg"
      color="light"
      {...restProps}
    />
  );
};

export default HeaderIconButton;
