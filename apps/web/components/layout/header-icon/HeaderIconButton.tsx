import { IconButton, type IconButtonProps } from '@repo/ui/components';

type HeaderIconButtonProps = Omit<IconButtonProps, 'variant' | 'color' | 'iconSize' | 'buttonSize'>;

const HeaderIconButton = ({ iconName, ariaLabel, ...restProps }: HeaderIconButtonProps) => {
  return (
    <IconButton
      iconName={iconName}
      ariaLabel={ariaLabel}
      iconSize="sm"
      buttonSize="sm"
      variant="fulled"
      color="lightMode"
      {...restProps}
    />
  );
};

export default HeaderIconButton;
