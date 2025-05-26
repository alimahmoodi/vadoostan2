'use client';

import { createFormContext } from '@/createFormContext';

// import { createFormContext } from 'shared-components';

export const LoginFormContext = createFormContext<{
  phone: string | undefined;
}>({
  phone: undefined,
});

export const LoginFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LoginFormContext.Provider mode='onSubmit'>
      {children}
    </LoginFormContext.Provider>
  );
};
