'use client';
import classes from './style.module.scss';

interface DescriptionAreaProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

const DescriptionArea = ({ description, title }: DescriptionAreaProps) => {
  return (
    <div>
      <div className={classes['divider']} />
      <div className={classes['content']}>
        <div className={classes['title']}>{title}</div>
        <div className={classes['description']}>{description}</div>
      </div>
    </div>
  );
};

export { DescriptionArea };
