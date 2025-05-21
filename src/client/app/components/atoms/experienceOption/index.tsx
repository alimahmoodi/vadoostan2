import classes from './style.module.scss';

const ExperienceOption = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div className={classes['wrapper']}>
      {icon}
      {title}
    </div>
  );
};

export { ExperienceOption };
