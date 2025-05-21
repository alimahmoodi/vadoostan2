'use client';
import {
  ActionButton,
  successToast,
  TextInput,
  ErrorText,
} from '@/app/components';
import classes from './style.module.scss';
import { SignupFormContext, SignupFormProvider } from './formProvider';
import { Checkbox, Grid, Input } from '@mantine/core';
import {
  familyRules,
  inputWrapperErrorStyle,
  nameRules,
  phoneNumberRule,
} from '@/app/utils';
import { useSignup } from '@/services/services';
// import { PersianSupportNumberInput } from '../components/atoms/persianSupportInput';
import classNames from 'classnames';

interface SignUpFormProps {
  onSubmitForm: (phone?: string) => void;
}

const SignUpForm = ({ onSubmitForm }: SignUpFormProps) => {
  const { Controller } = SignupFormContext;
  const { handleSubmit, watch } = SignupFormContext.useFormContext();
  const { errors } = SignupFormContext.useFormState();
  const { getValues } = SignupFormContext.useFormContext();
  const { mutate: onSignup, isPending, error } = useSignup();

  const onSubmit = () => {
    const { family, name, phone } = getValues();
    onSignup(
      {
        client: 'web',
        firstName: name,
        lastName: family,
        mobileNumber: phone as string,
      },
      {
        onSuccess() {
          successToast({ message: 'کد ارسال شد!' });
          onSubmitForm(getValues('phone')?.toString());
        },
      }
    );
  };

  return (
    <>
      <Grid className={classes['name-wrapper']}>
        <Grid.Col span={6}>
          <Controller
            name='name'
            rules={nameRules}
            render={({ field }) => (
              <Input.Wrapper
                styles={{
                  error: inputWrapperErrorStyle,
                }}
                error={errors.name?.message}
              >
                <TextInput
                  {...field}
                  styles={{
                    wrapper: {
                      width: '100%',
                    },
                  }}
                  className={classes['input']}
                  width={150}
                  radius={20}
                  size='lg'
                  placeholder='نام'
                />
              </Input.Wrapper>
            )}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Controller
            name='family'
            rules={familyRules}
            render={({ field }) => (
              <Input.Wrapper
                styles={{ error: inputWrapperErrorStyle }}
                error={errors.family?.message}
              >
                <TextInput
                  {...field}
                  className={classes['input']}
                  radius={20}
                  size='lg'
                  placeholder='نام‌خانوادگی'
                  styles={{
                    wrapper: {
                      width: '100%',
                    },
                  }}
                />
              </Input.Wrapper>
            )}
          />
        </Grid.Col>
      </Grid>
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
              type='tel'
              onChange={(e) => {
                if (e.target.value.length <= 11) {
                  field.onChange(e);
                }
              }}
              value={field.value}
              style={{
                width: '100%',
              }}
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
      <div className={classes['age-confirm']}>
        <Controller
          rules={{
            validate: (value) => {
              if (!value) return 'fail';
            },
          }}
          name='ageConfirm'
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox
                styles={{
                  input: {
                    ...(errors.ageConfirm?.message && {
                      border: '1px solid #ee3f56',
                    }),
                    ...(watch('ageConfirm') && {
                      backgroundColor: '#15A983',
                    }),
                  },
                }}
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
            );
          }}
        />

        <div
          className={classNames(
            classes['age-confirm-text'],
            errors.ageConfirm?.message && classes['age-confirm-text--error'],
            watch('ageConfirm') && classes['age-confirm-text--confirmed']
          )}
        >
          تایید می‌کنم که حداقل 18 سال سن دارم
        </div>
      </div>
      {error ? <ErrorText errorText={error.message} /> : null}
      <ActionButton
        loading={isPending}
        onClick={handleSubmit(onSubmit)}
        className={classes['button']}
      >
        ادامه
      </ActionButton>
    </>
  );
};

const FormProvider = ({ onSubmitForm }: SignUpFormProps) => {
  return (
    <SignupFormProvider>
      <SignUpForm onSubmitForm={onSubmitForm} />
    </SignupFormProvider>
  );
};

export { FormProvider as SignUpForm };
