'use client';
import { SignUpForm } from './form';
import { Otp } from '@/app/components';
import { useState } from 'react';
import { LoginHeader } from '@/app/components';
import { useRouter } from 'next/navigation';

type SignupStatus = 'signup' | 'otp';

const Signup = () => {
  const [signUpStatus, setSignUpStatus] = useState<SignupStatus>('signup');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const router = useRouter();

  const onSubmitForm = (phone?: string) => {
    if (phone) {
      setPhoneNumber(phone);
    }
    setSignUpStatus('otp');
  };

  const onVerifyOtp = async () => {
    router.push('/experience-list');
  };

  const onBackToSignup = () => {
    if (signUpStatus === 'otp') {
      setSignUpStatus('signup');
    } else if (signUpStatus === 'signup') {
      router.back();
    }
  };

  return (
    <>
      <LoginHeader
        style={{ marginBlockStart: 70, marginBlockEnd: 50 }}
        onBack={onBackToSignup}
        title={signUpStatus === 'signup' ? 'ثبت نام' : 'تایید شماره موبایل'}
      />
      {signUpStatus === 'signup' ? (
        <SignUpForm onSubmitForm={onSubmitForm} />
      ) : (
        <Otp mode='signup' phoneNumber={phoneNumber} onVerify={onVerifyOtp} />
      )}
    </>
  );
};

export default Signup;
