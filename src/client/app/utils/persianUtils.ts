const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

const toEnglishNumbers = (str: string) => {
  let output = str;

  persianNumbers.forEach((item, index) => {
    output = output.split(item).join(index.toString());
  });
  arabicNumbers.forEach((item, index) => {
    output = output.split(item).join(index.toString());
  });

  return output;
};

const removeLetterFromNumber = (value: string) => {
  if (value) {
    return value.replace(/[^0-9]+/, '');
  }
  return '';
};

const numberInputThousandSeparator = (value: string) => {
  if (value) {
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};

const currentNumberToEnglish = (value: string) => {
  if (value) {
    const englishNumber = toEnglishNumbers(value);
    const numberOnly = removeLetterFromNumber(englishNumber);
    return numberOnly;
  }
  return '';
};

const PersianUtil = {
  toEnglishNumbers,
  numberInputThousandSeparator,
  currentNumberToEnglish,
};

export { PersianUtil };
