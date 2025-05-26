'use client';
import {
  // ElementProps,
  // InputProps,
  TextInput as MantineTextInput,
  TextInputProps,
} from '@mantine/core';
import classes from './style.module.scss';

// interface MyTextInputProps
//   extends InputProps,
//     ElementProps<'input', keyof InputProps> {}

const TextInput = (props: TextInputProps) => {
  return (
    <MantineTextInput
      {...props}
      classNames={{ input: classes['name-input'] }}
    />
  );
};

export { TextInput };
