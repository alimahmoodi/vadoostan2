import { PersianUtil } from '@/app/utils';
import { InputBase, InputBaseProps } from '@mantine/core';
import { InputHTMLAttributes } from 'react';
import { IMaskInput } from 'react-imask';

interface Props extends InputBaseProps {
  withThousandsSeparator?: boolean;
  onChangeHandler?: (e: string) => void;
  value?: string;
  placeholder?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const PersianSupportNumberInput = ({
  // withThousandsSeparator,
  onChangeHandler,
  value,
  placeholder,
  onChange,
}: Props) => {
  return (
    <InputBase
      onChange={(e) => {
        //@ts-expect-error error
        onChange?.(e);
      }}
      type='tel'
      component={IMaskInput}
      // mask={[
      //   {
      //     mask: 'X',
      //     blocks: {
      //       X: {
      //         mask: Number,
      //         thousandsSeparator: withThousandsSeparator ? ',' : '',
      //       },
      //     },
      //   },
      // ]}
      value={value}
      placeholder={placeholder}
      prepare={(e) => PersianUtil.currentNumberToEnglish(e)}
      onAccept={(_, masked) => {
        const unmaskedValue = masked.unmaskedValue.toString();
        onChangeHandler?.(unmaskedValue);
        return unmaskedValue;
      }}
    />
  );
};

export { PersianSupportNumberInput };
