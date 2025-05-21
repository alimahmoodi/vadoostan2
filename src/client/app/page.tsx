import { ActionButton, Text } from '@/app/components';
import classes from './style.module.scss';
import { Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={classes['landing']}>
      <div className={classes['image']}>
        <div className={classes['actions']}>
          <div className={classes['title-wrapper']}>
            <Text size='22px' fw={700} style={{ marginBottom: 8 }}>
              وَ دوستان
            </Text>
            <Text style={{ marginBottom: 18 }} size='22px' fw={700}>
              جایی برای تجربه‌های حال‌‌خوب‌کن
            </Text>
          </div>
          <div className={classes['buttons']}>
            <ActionButton style={{ width: 160, height: 60 }}>
              <Link href='/signup'>ثبت نام</Link>
            </ActionButton>
            <Button
              style={{
                width: 160,
                height: 60,
                backgroundColor: '#F5F7F6',
                borderRadius: 10,
                color: 'black',
                fontSize: 18,
              }}
            >
              <Link href={'/login'}>ورود</Link>
            </Button>
          </div>
          <div className={classes['list-text']}>
            <Link href={'/experience-list'}>لیست تجربه‌ها</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
