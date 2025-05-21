import { createFormContext } from '@/app/utils';

export const SignupFormContext = createFormContext<{
  name: string;
  family: string;
  phone: string | undefined;
  ageConfirm: boolean;
}>({
  name: '',
  family: '',
  phone: undefined,
  ageConfirm: false,
});

export const SignupFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SignupFormContext.Provider mode='onSubmit'>
      {children}
    </SignupFormContext.Provider>
  );
};
