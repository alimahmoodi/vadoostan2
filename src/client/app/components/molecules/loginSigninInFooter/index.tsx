'use server';
import { ActionButton, FooterActionBarTemplate } from '../../atoms';
import { Text } from '@/app/components';
import classes from './style.module.scss';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Authenticate } from './authenticateFooter';

export default async function LoginSigninInFooter() {
  const cookieStore = await cookies();

  console.log({ cookieStore });
  const token = cookieStore.get('token');

  const unAuthenticated = (
    <div className={classes['wrapper']}>
      <ActionButton style={{ width: 160, height: 60 }}>
        <Link href={'/signup'}>ثبت نام</Link>
      </ActionButton>
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        className={classes['login']}
        size='18px'
        fw={700}
      >
        <Link href={'/login'}>ورود</Link>
      </Text>
    </div>
  );

  return (
    <FooterActionBarTemplate>
      {token ? <Authenticate /> : unAuthenticated}
    </FooterActionBarTemplate>
  );
}
