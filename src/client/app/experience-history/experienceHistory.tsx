'use client';
import { useEffect, useRef, useState } from 'react';
import { ExperienceItem, LoginHeader } from '../components';
import classes from './style.module.scss';
import { Text } from '@mantine/core';
import { ExperienceItemProps, ExperienceItemStatus } from '@/sharedTypes.type';
import { useRouter } from 'next/navigation';
import { useGetUserExperienceList } from '@/services/services';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

interface UsersExperienceList {
  active: {
    name: string;
    list: ExperienceItemProps[];
  };
  recent: {
    name: string;
    list: ExperienceItemProps[];
  };
}

const ExperienceHistory = ({ footer }: { footer: React.ReactNode }) => {
  const token = getCookie('token') as string;
  const cookieData =
    token &&
    (jwtDecode(token) as {
      client: string;
      iat: number;
      userId: string;
    });

  let userId: string | undefined = undefined;

  if (cookieData) {
    userId = cookieData.userId;
  }

  const { data } = useGetUserExperienceList({
    userId: userId,
  });

  const mockHistoryList: UsersExperienceList = {
    active: {
      name: 'تجربیات فعال',
      list: (data?.result.exps || []).map(
        ({ address, category, date, id, price, status, title }) => {
          if (status === 'published') {
            return {
              category,
              title,
              price,
              id,
              address,
              date,
              time: date,
              status: 'active-historial' as ExperienceItemStatus,
            };
          }
        }
      ) as ExperienceItemProps[],
    },
    recent: {
      name: 'تجربیات گذشته',
      list: (data?.result.exps || []).map(
        ({ address, category, date, id, price, title, status }) => {
          if (status === 'inactive') {
            return {
              category: category,
              title: title,
              time: date,
              price: price,
              id,
              address,
              date,
              status: 'recent-historical' as ExperienceItemStatus,
            };
          }
        }
      ) as ExperienceItemProps[],
    },
  };
  const router = useRouter();

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

  return (
    <div className={classes['wrapper']}>
      <div style={{ paddingInline: 32 }}>
        <LoginHeader
          style={{ marginBlockEnd: 30, marginBlockStart: 50 }}
          onBack={() => {
            router.back();
          }}
          title={'تجربیات گذشته'}
        />
        <Text style={{ marginBlockEnd: 16 }} fw={900} size='18px'>
          {interSectedDateIndex === '0' ? 'تجربیات فعال' : 'تجربیات گذشته'}
        </Text>
      </div>
      <div ref={rootObserverElement} className={classes['list-wrapper']}>
        {(
          Object.entries(mockHistoryList) as [
            string,
            {
              name: string;
              list: ExperienceItemProps[];
            },
          ][]
        ).map(([, { list, name }], index) => {
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
                  style={{ marginBottom: 12, marginTop: index > 0 ? 24 : 0 }}
                >
                  {name}
                </Text>
              ) : null}
              {list.map(
                (
                  { address, category, date, id, price, status, title },
                  index
                ) => {
                  return (
                    <ExperienceItem
                      key={index}
                      address={address}
                      category={category}
                      date={date}
                      id={id}
                      price={price}
                      status={status}
                      title={title}
                    />
                  );
                }
              )}
            </div>
          );
        })}
      </div>
      {footer}
    </div>
  );
};

export { ExperienceHistory };
