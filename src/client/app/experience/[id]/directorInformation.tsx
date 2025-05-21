import { baseUrl } from '@/services/apiClient';
import classes from './style.module.scss';
import Image from 'next/image';

interface DirectorInformationProps {
  name: string | undefined;
  photoUrl: string | undefined;
}

export const DirectorInformation = ({
  name,
  photoUrl,
}: DirectorInformationProps) => {
  return (
    <div className={classes['director']}>
      <Image
        className={classes['director--image']}
        src={`https://${baseUrl}${photoUrl}`}
        width={55}
        height={55}
        alt='director-image'
      />
      <div className={classes['director--detail']}>
        <div className={classes['director--name']}>{name}</div>
        <div className={classes['director--role']}>برگزار کننده</div>
      </div>
    </div>
  );
};
