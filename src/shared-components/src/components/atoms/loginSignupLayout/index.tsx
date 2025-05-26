import classes from './style.module.scss';
export function LogInSignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes['layout-wrapper']}>
      <div style={{ width: '100%', paddingInline: 40 }}>{children}</div>
    </div>
  );
}
