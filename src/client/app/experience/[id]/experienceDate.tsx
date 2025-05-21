import classes from './style.module.scss';
import moment from 'moment-jalaali';

export const ExperienceDate = ({
  date,
  address,
  title,
}: {
  date: string | undefined;
  title: string | undefined;
  address: string | undefined;
}) => {
  return (
    <div className={classes['title-wrapper']}>
      <div className={classes['title']}>{title}</div>
      <div className={classes['abbr']}>
        <div className={classes['date']}>
          {moment(date).locale('fa').format('jD jMMMM, ساعت: HH:mm')}
        </div>
        <div className={classes['circle']} />
        <div className={classes['location']}>{address}</div>
      </div>
    </div>
  );
};
