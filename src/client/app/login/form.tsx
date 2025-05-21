'use client';
import { ActionButton, ErrorText } from '@/app/components';
import { LoginFormContext, LoginFormProvider } from './formProvider';
import { Input, TextInput } from '@mantine/core';
import { inputWrapperErrorStyle, phoneNumberRule } from '@/app/utils';

interface SignUpFormProps {
  onSubmitForm: (phone?: string) => void;
  isPending: boolean;
  errorText: string | undefined;
}

const LoginForm = ({ onSubmitForm, isPending, errorText }: SignUpFormProps) => {
  const { Controller } = LoginFormContext;
  const { handleSubmit } = LoginFormContext.useFormContext();
  const { errors } = LoginFormContext.useFormState();
  const { watch } = LoginFormContext.useFormContext();
  const phoneNumber = watch('phone');

  const onSubmit = () => {
    onSubmitForm(phoneNumber?.toString());
  };

  return (
    <>
      <Controller
        name='phone'
        rules={phoneNumberRule}
        render={({ field }) => (
          <Input.Wrapper
            styles={{
              error: inputWrapperErrorStyle,
            }}
            error={errors.phone?.message}
          >
            <TextInput
              {...field}
              type='tel'
              onChange={field.onChange}
              style={{ width: '100%' }}
              styles={{
                input: {
                  backgroundColor: '#f2f2f2',
                },
              }}
              radius={20}
              size='lg'
              placeholder='شماره تماس'
            />
          </Input.Wrapper>
        )}
      />
      {errorText ? <ErrorText errorText={errorText ?? ''} /> : null}
      <ActionButton
        loading={isPending}
        onClick={handleSubmit(onSubmit)}
        style={{ marginBlockStart: 16 }}
      >
        ادامه
      </ActionButton>
    </>
  );
};

const FormProvider = ({
  onSubmitForm,
  isPending,
  errorText,
}: SignUpFormProps) => {
  return (
    <LoginFormProvider>
      <LoginForm
        onSubmitForm={onSubmitForm}
        isPending={isPending}
        errorText={errorText}
      />
    </LoginFormProvider>
  );
};

export { FormProvider as LoginForm };
