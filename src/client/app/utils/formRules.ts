const persianRegex = /^[\u0600-\u06FF\s]+$/;
const phoneNumberRegex = /^09\d{9}$/;
const requireFieldMessage = 'این فیلد الزامی است';

export const phoneNumberRule = {
  required: requireFieldMessage,
  pattern: {
    value: phoneNumberRegex,
    message: 'شماره تماس باید با 09 شروع شود!',
  },
};
export const nameRules = {
  required: requireFieldMessage,
  pattern: {
    value: persianRegex,
    message: 'نام باید فارسی باشد!',
  },
};
export const familyRules = {
  required: requireFieldMessage,
  pattern: {
    value: persianRegex,
    message: 'نام خانوادگی باید فارسی باشد!',
  },
};
