import { Button, ButtonProps, ElementProps } from '@mantine/core';
import classNames from 'classnames';

interface MyTextInputProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {}

const ActionButton = ({ children, ...rest }: MyTextInputProps) => {
  return (
    <Button
      {...rest}
      radius={10}
      size='lg'
      fullWidth
      variant='filled'
      bg={'red'}
      className={classNames(rest.className)}
    >
      {children}
    </Button>
  );
};

export { ActionButton };
