import { LogInSignupLayout } from '@/app/components';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LogInSignupLayout>{children}</LogInSignupLayout>;
}
