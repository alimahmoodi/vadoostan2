import classes from './style.module.scss';
import { BackIcon } from '../../atoms';
import { CSSProperties } from 'react';

const LoginHeader = ({
  onBack,
  title,
  style,
}: {
  onBack: () => void;
  title: string;
  style?: CSSProperties;
}) => {
  return (
    <div style={{ ...style }} className={classes['title-wrapper']}>
      <BackIcon onClick={onBack} />
      <div className={classes['title']}>{title}</div>
    </div>
  );
};

export { LoginHeader };
