import { colors } from '@/colors';
import classes from './style.module.scss';
import { Text } from '@/app/components';
import { redirect, RedirectType } from 'next/navigation';
import classNames from 'classnames';
import moment from 'moment-jalaali';
import { categoryLookup } from '@/app/utils/categoryLookup';
import { priceHumanize } from '@/app/utils/priceHumanize';
import { ExperienceItemProps } from '@/sharedTypes.type';

const ExperienceItem = ({
  category,
  price,
  title,
  address,
  date,
  status,
  id,
}: ExperienceItemProps) => {
  const isSoldOut = status === 'soldout';
  const isActiveHistorical = status === 'active-historial';
  const isRecentHistorical = status === 'recent-historical';
  const isActive = status === 'active';
  const textColor = isSoldOut ? '#B4B4B4' : '#000000';

  const priceTag = (
    <div className={classNames(classes['price--tag'], classes['tag'])}>
      <Text size='12px' c={colors['cta-color']} fw={700}>
        {priceHumanize(price)}
      </Text>
    </div>
  );

  const time = moment(date).format('HH:mm');

  const soldoutTag = (
    <div className={classNames(classes['soldout-tag'], classes['tag'])}>
      <Text size='12px' c={'#ffffff'} fw={700}>
        {'تکمیل ظرفیت'}
      </Text>
    </div>
  );

  const activeHistoricalTag = (
    <div
      onClick={() => {
        redirect('/ticket', RedirectType.push);
      }}
      className={classNames(classes['active-historical-tag'], classes['tag'])}
    >
      <Text size='12px' c={'#ffffff'} fw={700}>
        {'نمایش بلیت'}
      </Text>
    </div>
  );

  return (
    <div
      onClick={() => {
        if (isActive || isSoldOut) {
          redirect(`/experience/${id}?status=${status}`, RedirectType.push);
        }
      }}
      className={classNames(
        classes['wrapper'],
        isRecentHistorical && classes['wrapper--recent-historical']
      )}
    >
      <div
        style={{
          backgroundColor:
            isSoldOut || isRecentHistorical
              ? '#cecece'
              : categoryLookup[category].color,
        }}
        className={classes['category']}
      >
        <Text
          c={isSoldOut || isRecentHistorical ? '#ffffff' : '#000000'}
          size='14px'
          fw={800}
        >
          {categoryLookup[category].persian}
        </Text>
      </div>
      <div className={classes['detail']}>
        <Text style={{ marginBottom: 8 }} c={textColor} size={'14px'} fw={900}>
          {title}
        </Text>
        <div className={classes['location-wrapper']}>
          <div className={classes['location']}>
            <Text c={textColor} size={'12px'} fw={400}>
              {`محله: ${address}`}
            </Text>
            <div
              className={classNames(
                classes['dot'],
                (isSoldOut || isRecentHistorical) && classes['dot--soldout']
              )}
            />
            <Text c={textColor} size={'12px'} fw={400}>
              {`ساعت: ${time}`}
            </Text>
          </div>
          <div className={classes['price-wrapper']}>
            {isSoldOut
              ? soldoutTag
              : isActiveHistorical
                ? activeHistoricalTag
                : isActive
                  ? priceTag
                  : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ExperienceItem };
