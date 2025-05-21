'use client';
import { Button } from '@mantine/core';
import { ActionButton, LoginHeader } from '../components';
import classes from './style.module.scss';
import { TicketItem } from './ticketItem';
import { useRouter } from 'next/navigation';

const Ticket = () => {
  const router = useRouter();
  return (
    <div className={classes['wrapper']}>
      <LoginHeader
        style={{ marginBlockEnd: 100 }}
        onBack={() => {
          router.back();
        }}
        title={'بلیت'}
      />
      <TicketItem title='تجربه' description={'شبِ خلق: «سفالگری با چرخ»'} />
      <TicketItem
        title='مکان'
        description={
          'شریعتی - بالاتر از مترو صدر - خیابان هدایت - خیابان دشتی - پلاک 16 - کافه خانه دلنشین'
        }
      />
      <TicketItem title='زمان' description='۱۲ بهمن، ساعت ۱۶:۰۰' />
      <div style={{ paddingBlockStart: 24 }}>
        <ActionButton>لوکیشن</ActionButton>
        <Button
          fullWidth
          radius={20}
          size='lg'
          variant='filled'
          bg={'#D9D7FA'}
          c={'#7A72FF'}
          style={{ marginBlockStart: 20 }}
        >
          اضافه کردن به تقویم
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
