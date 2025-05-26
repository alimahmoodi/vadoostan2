import { Button } from '@mantine/core';
import classes from './style.module.scss';

const ErrorView = ({
  refetch,
  text,
  isFetching,
}: {
  text: string | undefined;
  refetch: () => void;
  isFetching: boolean;
}) => {
  return (
    <div className={classes['wrapper']}>
      <div className={classes['text']}>{text}</div>
      <Button loading={isFetching} onClick={refetch}>
        تلاش مجدد
      </Button>
    </div>
  );
};
export { ErrorView };
