import { Button, ButtonProps, ElementProps } from '@mantine/core';
import classNames from 'classnames';
import classes from './style.module.scss';
import { colors } from '@/colors';

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
      bg={colors['cta-bg']}
      className={classNames(rest.className, classes['action-button'])}
    >
      {children}
    </Button>
  );
};

export { ActionButton };
