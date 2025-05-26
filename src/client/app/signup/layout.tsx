import { LogInSignupLayout } from 'shared-components';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LogInSignupLayout>{children}</LogInSignupLayout>;
}
