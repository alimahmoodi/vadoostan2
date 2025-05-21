'use client';
import classNames from 'classnames';
import classes from './style.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FooterItem } from './footerItem';
import { ExperienceListIcon, ProfileIcon } from './icons';

const Authenticate = () => {
  const pathname = usePathname();
  const isProfileActive = pathname === '/profile';
  const isPastExperinceActive = pathname === '/experience-history';
  const isExperinceListActive = pathname === '/experience-list';

  return (
    <div
      className={classNames(
        classes['wrapper'],
        classes['wrapper--authenticate']
      )}
    >
      <Link href={'/profile'}>
        <FooterItem
          icon={
            <ProfileIcon isActive={isProfileActive || isPastExperinceActive} />
          }
          isActive={isProfileActive || isPastExperinceActive}
          text='پروفایل'
        />
      </Link>
      <Link href={'/experience-list'}>
        <FooterItem
          isActive={isExperinceListActive}
          icon={<ExperienceListIcon isActive={isExperinceListActive} />}
          text='تجربه‌ها'
        />
      </Link>
    </div>
  );
};

export { Authenticate };
