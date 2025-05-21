'use client';
import { LoginHeader } from '../components';
import classes from './style.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Skeleton, Text } from '@mantine/core';
import { useGetInvoice } from '@/services/services';
import { priceHumanize } from '../utils/priceHumanize';
import { Suspense } from 'react';
const Invoice = () => {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const expId = searchParams.get('expId');
  const { data, isLoading } = useGetInvoice({ id: expId });

  return (
    <div className={classes['wrapper']}>
      <LoginHeader
        style={{ marginBlockEnd: 48 }}
        onBack={() => {
          back();
        }}
        title={'فاکتور'}
      />
      <Text fw={700} size='16px'>
        {'جزئیات قیمت'}
      </Text>
      <div className={classes['detail']}>
        <div className={classes['price-wrapper']}>
          <Text size='14px' fw={600}>
            {'هزینه تجربه'}
          </Text>
          {isLoading ? (
            <Skeleton height={20} width={60} />
          ) : (
            <Text size='14px' fw={600}>
              {priceHumanize(data?.result.expPrice)}
            </Text>
          )}
        </div>
        <div className={classes['price-wrapper']}>
          <Text size='14px' fw={600}>
            {'مالیات'}
          </Text>
          {isLoading ? (
            <Skeleton height={20} width={60} />
          ) : (
            <Text size='14px' fw={600}>
              {priceHumanize(data?.result.tax)}
            </Text>
          )}
        </div>
      </div>
      <div className={classes['final-price']}>
        <div className={classes['price-wrapper']}>
          <Text size='14px' fw={600}>
            {'قابل پرداخت'}
          </Text>
          {isLoading ? (
            <Skeleton height={20} width={60} />
          ) : (
            <Text size='14px' fw={600}>
              {priceHumanize(data?.result.payable)}
            </Text>
          )}
        </div>
      </div>
      <div className={classes['pay-invoice']}>
        <Button fullWidth c={'#ffffff'} bg={'#15A983'} radius={20} h={60}>
          {'پرداخت'}
        </Button>
      </div>
    </div>
  );
};

function InvoiceSuspence() {
  return (
    <Suspense>
      <Invoice />
    </Suspense>
  );
}

export default InvoiceSuspence;
