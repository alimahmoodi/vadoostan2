'use client';
import {
  DateFilter,
  ErrorView,
  ExperienceItem,
  LoginHeader,
  Text,
} from '@/app/components';
import classes from './style.module.scss';
import moment from 'moment-jalaali';
import { Button, Loader } from '@mantine/core';
import { ExperienceListContext } from './provider';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetExperienceList } from '@/services/services';
import _ from 'lodash';
import { colors } from '@/colors';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

export const ExperienceList = ({ footer }: { footer: React.ReactNode }) => {
  const router = useRouter();
  const { onRemoveFilter, selectedDate } = useContext(ExperienceListContext);
  const [interSectedDateIndex, setInterSectedDateIndex] = useState<
    string | null
  >('0');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rootObserverElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target.getAttribute('data-itemindex'); // Get the item's text
          if (entry.isIntersecting && item) {
            setInterSectedDateIndex(item);
          }
        });
      },
      {
        root: rootObserverElement.current,
        rootMargin: '0px 0px -100% 0px',
        threshold: 0,
      }
    );
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      if (itemRefs.current) {
        itemRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  const generateTitleDate = (day: string) => {
    return (
      <Text fw={900} size={'18px'}>
        {moment(day).locale('fa').format('dddd, jD jMMMM')}
      </Text>
    );
  };

  const { data, isLoading, isError, refetch, error, isFetching } =
    useGetExperienceList({
      status: 'PUBLISHED',
    });

  const expList = data?.result.exps;

  const filteredData = data?.result.exps.filter(({ date }) => {
    if (!selectedDate) return true;
    return (
      moment(date).format('YYYY/MM/DD') ===
      moment(selectedDate).format('YYYY/MM/DD')
    );
  });

  const groupedByDate = _.groupBy(
    filteredData,
    (item) => item.date.split('T')[0]
  );

  const groupedByDateForFilterList = _.groupBy(
    expList,
    (item) => item.date.split('T')[0]
  );

  const titleDate =
    interSectedDateIndex && groupedByDate
      ? Object.entries(groupedByDate || [])?.[Number(interSectedDateIndex)]?.[
          '0'
        ]
      : null;

  const availableDate = Object.entries(groupedByDateForFilterList).map(
    ([date]) => date
  );

  return (
    <>
      <div className={classes['wrapper']}>
        <LoginHeader
          style={{
            marginBlockEnd: 30,
            marginBlockStart: 50,
            marginInline: 20,
          }}
          onBack={() => {
            router.back();
          }}
          title={'تجربه‌ها'}
        />
        {isError ? (
          <ErrorView
            isFetching={isFetching}
            refetch={refetch}
            text={error.message}
          />
        ) : isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader color={colors['cta-color']} />
          </div>
        ) : (
          <>
            <div style={{ paddingInline: 20 }}>
              <DateFilter dates={availableDate} />
              <div className={classes['day-indicator']}>
                {titleDate ? generateTitleDate(titleDate) : ''}
                {selectedDate ? (
                  <Button
                    bg={'#ee3f56'}
                    onClick={onRemoveFilter}
                    className={classes['remove-filter']}
                    styles={{ label: { width: 64, textAlign: 'center' } }}
                  >
                    حذف فیلتر
                  </Button>
                ) : null}
              </div>
            </div>
            <div
              ref={rootObserverElement}
              className={classes['experience-list-wrapper']}
            >
              {Object.entries(groupedByDate).map(([day, list], index) => {
                return (
                  <div
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    key={index}
                    data-itemindex={index}
                  >
                    {index > 0 ? (
                      <Text
                        fw={900}
                        size={'18px'}
                        style={{
                          marginBottom: 12,
                          marginTop: index > 0 ? 24 : 0,
                        }}
                      >
                        {moment(day).locale('fa').format('dddd, jD jMMMM')}
                      </Text>
                    ) : null}
                    {list.map(
                      (
                        { address, category, date, id, isFilled, price, title },
                        index
                      ) => {
                        return (
                          <ExperienceItem
                            key={index}
                            address={address}
                            category={category}
                            date={date}
                            id={id}
                            status={isFilled ? 'soldout' : 'active'}
                            price={price}
                            title={title}
                          />
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {footer}
    </>
  );
};
