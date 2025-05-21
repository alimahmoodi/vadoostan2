'use client';
import { Button } from '@mantine/core';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';

export const ButtonLogout = () => {
  const handleOnClickLogout = () => {
    deleteCookie('token');
  };
  return (
    <Link href={'/experience-list'} onClick={handleOnClickLogout}>
      <Button style={{ marginInlineStart: 30 }}>Exit For Test</Button>
    </Link>
  );
};
