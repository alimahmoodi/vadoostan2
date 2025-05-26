import classes from './style.module.scss';
const FooterActionBarTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={classes['wrapper']}>{children}</div>;
};

export { FooterActionBarTemplate };
