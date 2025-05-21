import Image from 'next/image';
import classes from './style.module.scss';

const ExperienceBackIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={classes['back-icon-wrapper']}>
      <Image
        onClick={onClick}
        src='/Vector.svg'
        alt='backward icon'
        width={7}
        height={13}
        priority
        className={classes['back-icon']}
      />
    </div>
  );
};

export { ExperienceBackIcon };
