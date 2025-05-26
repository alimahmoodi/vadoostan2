import classes from './style.module.scss';

const ErrorText = ({ errorText }: { errorText: string }) => {
  return <div className={classes['error-text']}>{errorText}</div>;
};

export { ErrorText };
