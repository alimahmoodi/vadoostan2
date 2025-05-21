'use client';
import { useGetExperienceDetail } from '@/services/services';
import classes from './style.module.scss';
import {
  DescriptionArea,
  ExperienceOption,
  Carousel,
  FooterActionBarTemplate,
  ActionButton,
  ErrorView,
} from '@/app/components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Button, Loader } from '@mantine/core';
import { colors } from '@/colors';
import { ExperienceDate } from './experienceDate';
import { DirectorInformation } from './directorInformation';
import { Faq } from './faq';
import { priceHumanize } from '@/app/utils/priceHumanize';
import { ExperienceBackIcon } from './experienceBackIcon';

export default function Experience({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const { isLoading, data, isError, isFetching, refetch, error } =
    useGetExperienceDetail({
      id,
    });

  const router = useRouter();
  const options = data?.result.inclusions.map((item, index) => {
    return (
      <ExperienceOption
        key={index}
        icon={<Image src={'/option.svg'} width={26} height={24} alt='option' />}
        title={item}
      />
    );
  });

  const onBack = () => {
    router.back();
  };

  const onPay = () => {
    router.push(`/invoice?expId=${id}`);
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      {isError ? (
        <ErrorView
          isFetching={isFetching}
          refetch={refetch}
          text={error.message}
        />
      ) : isLoading ? (
        <div className={classes['loading']}>
          <Loader color={colors['cta-color']} />
        </div>
      ) : (
        <>
          <ExperienceBackIcon onClick={onBack} />
          <div style={{ paddingBlockEnd: 80 }}>
            <div className={classes['carousel']}>
              <Carousel imagesUrl={data?.result.expPhotos} />
            </div>
            <ExperienceDate
              date={data?.result.date}
              title={data?.result.title}
              address={data?.result.address}
            />
            <div className={classes['main-content-wrapper']}>
              <DescriptionArea
                title='توضیحات'
                description={data?.result.description.main}
              />
              <DescriptionArea
                title='آنچه در تجربه ارائه می‌شود'
                description={
                  <div className={classes['options-wrapper']}>{options}</div>
                }
              />
              <DescriptionArea
                title='سوالات متداول'
                description={<Faq faqs={data?.result.faqs} />}
              />
              {data?.result.directors.map(({ bio, name, photoUrl }, index) => {
                return (
                  <DescriptionArea
                    key={index}
                    title={
                      <DirectorInformation name={name} photoUrl={photoUrl} />
                    }
                    description={bio}
                  />
                );
              })}
            </div>
          </div>
          <FooterActionBarTemplate>
            <div className={classes['footer-wrapper']}>
              {status === 'active' ? (
                <ActionButton
                  onClick={onPay}
                  style={{ width: 200, height: 60 }}
                >
                  ثبت نام در تجربه
                </ActionButton>
              ) : (
                <Button
                  styles={{
                    root: {
                      backgroundColor: '#DEDEDE',
                      color: '#000000',
                      fontSize: 18,
                      borderRadius: 10,
                    },
                  }}
                  style={{ width: 200, height: 60 }}
                >
                  تکمیل ظرفیت
                </Button>
              )}

              <div className={classes['price-action']}>
                {priceHumanize(data?.result.price)}
              </div>
            </div>
          </FooterActionBarTemplate>
        </>
      )}
    </div>
  );
}
