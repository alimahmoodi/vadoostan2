'use client';
import { colors } from '@/colors';
import { Text } from '@/app/components';
import classes from './style.module.scss';

const FooterItem = ({
  icon,
  text,
  isActive,
}: {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}) => {
  return (
    <div className={classes['icon-label']}>
      {icon}
      <Text c={isActive ? colors['cta-color'] : '#000000'} size='12px' fw={800}>
        {text}
      </Text>
    </div>
  );
};

export { FooterItem };
