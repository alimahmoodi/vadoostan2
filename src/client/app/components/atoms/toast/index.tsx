import { toast } from 'react-toastify';
import classes from './style.module.scss';
import classNames from 'classnames';

export const errorToast = ({ message }: { message: string }) => {
  return toast.error(message, {
    position: 'top-center',
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: classNames(classes['toast'], classes['toast--error']),
  });
};

export const successToast = ({ message }: { message: string }) => {
  return toast.error(message, {
    position: 'top-center',
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: classNames(classes['toast'], classes['toast--success']),
  });
};
