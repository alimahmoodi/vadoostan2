import Image from 'next/image';
import classes from './style.module.scss';

const BackIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={classes['wrapper']}>
      <div
        className={classes['touch-area']}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      />
      <Image
        src='/Vector.svg'
        alt='backward icon'
        width={10}
        height={10}
        priority
      />
    </div>
  );
};

export { BackIcon };
