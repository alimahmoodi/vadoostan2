'use client';
import {
  FooterActionBarTemplate,
  ImageUploader,
  LoginHeader,
  TextInput,
} from '@/app/components';
import { useRouter } from 'next/navigation';
import classes from './style.module.scss';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';
import {
  Button,
  Loader,
  MultiSelect,
  NumberInput,
  Select,
  Space,
  Text,
  Textarea,
} from '@mantine/core';
import classNames from 'classnames';
import { TimeInput } from '@mantine/dates';
import {
  useCreateExperience,
  useGetDataForExperienceCreation,
} from '@/services/services';
import { NewExperienceFormContext } from './formContext';
import { colors } from '@/colors';
import { useState } from 'react';
import { NewFaqModal } from './newFaqModal';

const NewExperience = () => {
  const [isFaqModalVisible, setFaqModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [listOfFaq, setListOfFaq] = useState<
    { label: string; value: string; answer: string }[]
  >([]);
  const router = useRouter();
  const { Controller, useFormContext, useWatch } = NewExperienceFormContext;
  const { timeOfStart } = useWatch();
  console.log({ timeOfStart });

  const { setValue, getValues } = useFormContext();

  const handleOnback = () => {
    router.back();
  };

  const { data, isLoading } = useGetDataForExperienceCreation();

  const { mutate } = useCreateExperience();

  const { result } = data || {};
  const { categories, templates, inclusions, directors } = result || {};
  const _categories = categories?.map(({ id, title }) => {
    return {
      label: title,
      value: String(id),
    };
  });

  const _inclutions = inclusions?.map(({ id, title }) => {
    return {
      label: title,
      value: String(id),
    };
  });

  const templatesList = templates?.map(({ exp }) => {
    return {
      label: `${exp.title}`,
      value: exp.id,
    };
  });

  const directorListForTemplate = directors?.map(({ name, userId }) => {
    return {
      value: userId,
      label: name,
    };
  });

  const handleOnSelectTemplate = (value: string | null) => {
    setSelectedTemplate(value ?? '');
    const data = templates?.find(({ exp }) => exp.id === value);
    const { exp, faqs } = data || {};
    if (exp) {
      const { categoryId, description, title } = exp;
      setValue('name', title);
      setValue('description', description);
      setValue('category', String(categoryId));
    }
    if (faqs) {
      const _faq = faqs.map(({ question, answer }, index) => {
        return {
          value: String(index),
          label: question,
          answer: answer,
        };
      });
      setListOfFaq(_faq);
    }
  };

  const handleOnAddNewFaq = ({
    answer,
    question,
  }: {
    answer: string;
    question: string;
  }) => {
    const newId = String(listOfFaq.length);
    setListOfFaq((prev) => {
      return [...prev, { value: newId, label: question, answer: answer }];
    });
    const prevFaq = getValues('faq');
    setValue('faq', [...prevFaq, newId]);
  };

  const handleOnSelectDirector = (id: string | null) => {
    const director = directors?.find(({ userId }) => userId === id);
    if (director) {
      setValue('director', director.name);
      setValue('directorBio', director.bio);
    }
  };

  const submitForm = () => {
    const {
      address,
      capacity,
      category,
      date,
      description,
      director,
      directorBio,
      directorRole,
      duration,
      inclutions,
      locationLink,
      name,
      neighborHood,
      price,
      telegramLink,
      timeOfStart,
      venue,
    } = getValues();
    mutate({
      categoryId: Number(category),
      description: description,
      faqs: listOfFaq.map(({ answer, label }) => {
        return { answer: answer, question: label };
      }),
      title: name,
      isSeries: false,
      creatorUserId: 'sdfsdf',
      sessions: [
        {
          capacity: capacity as number,
          duration: Number(duration),
          price: Number(price),
          time: `${date} ${timeOfStart}`,
          assistantsUserId: [],
          allowedGender: 'all',
          description: description,
          groupLink: telegramLink,
          venueId: venue as unknown as number,
          directorsUserId: ['saasas'],
          publishTime: 'sdsd',
        },
      ],
    });
  };

  return (
    <div className={classes['wrapper']}>
      <div style={{ paddingInline: 20 }}>
        <LoginHeader
          style={{ marginBlockStart: 70, marginBlockEnd: 30 }}
          onBack={handleOnback}
          title={'خلق تجربه جدید'}
        />
      </div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader color={colors['cta-color']} />
        </div>
      ) : (
        <div className={classes['form']}>
          <Select
            value={selectedTemplate}
            onChange={handleOnSelectTemplate}
            label='تمپلیت'
            data={templatesList}
            searchable
            clearable
            nothingFoundMessage='یافت نشد...'
          />
          <Space h='md' />
          <Controller
            name='name'
            render={({ field }) => <TextInput {...field} label='نام تجربه' />}
          />
          <Space h='md' />
          <Controller
            name='description'
            render={({ field }) => (
              <Textarea {...field} label='توضیحات تجربه' rows={6} />
            )}
          />
          <Space h='md' />
          <Controller
            name='category'
            render={({ field }) => (
              <Select
                {...field}
                label='قبیله'
                data={_categories}
                searchable
                clearable
                nothingFoundMessage='قبیله یافت نشد...'
              />
            )}
          />
          <Space h='md' />
          <Controller
            name='duration'
            render={({ field }) => (
              <NumberInput {...field} label='مدت زمان' allowNegative={false} />
            )}
          />
          <Space h='md' />
          <Controller
            name='date'
            render={({ field }) => (
              <div
                style={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}
              >
                <Text size='sm'>تاریخ تجربه</Text>
                <DatePicker
                  onChange={(e) => {
                    field.onChange(
                      e?.convert(gregorian, gregorian_en).format('YYYY-MM-DD')
                    );
                  }}
                  value={field.value}
                  inputClass={classNames(classes['date-input'])}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition='bottom-right'
                />
              </div>
            )}
          />

          <Space h='md' />
          <Controller
            name='timeOfStart'
            render={({ field }) => <TimeInput {...field} label='ساعت شروع' />}
          />

          <Space h='md' />
          <Controller
            name='price'
            render={({ field }) => (
              <NumberInput
                {...field}
                label='قیمت'
                thousandSeparator=','
                allowNegative={false}
              />
            )}
          />
          <Space h='md' />
          <Controller
            name='capacity'
            render={({ field }) => (
              <NumberInput {...field} label='ظرفیت' allowNegative={false} />
            )}
          />
          <Space h='md' />
          <Controller
            name='telegramLink'
            render={({ field }) => (
              <TextInput {...field} label='لینک گروه تلگرامی' />
            )}
          />
          <Space h='md' />
          <Controller
            name='inclutions'
            render={({ field }) => (
              <MultiSelect
                {...field}
                label='آنچه در این تجربه ارائه می‌شود'
                data={_inclutions}
                searchable
                clearable
                nothingFoundMessage='موردی یافت نشد...'
              />
            )}
          />
          <Space h='md' />
          <Controller
            name='faq'
            render={({ field }) => (
              <MultiSelect
                {...field}
                label='سوالات متداول'
                data={listOfFaq}
                searchable
                clearable
                nothingFoundMessage='موردی یافت نشد...'
              />
            )}
          />
          <Space h='md' />
          <Button
            onClick={() => {
              setFaqModalVisible(true);
            }}
          >
            افزدون سوال متداول
          </Button>
          <Space h='md' />
          <NewFaqModal
            onConfirm={handleOnAddNewFaq}
            opened={isFaqModalVisible}
            onClosed={() => {
              setFaqModalVisible(false);
            }}
          />

          <Select
            onChange={handleOnSelectDirector}
            label='انتخاب سریع تجربه‌گردان'
            data={directorListForTemplate}
            searchable
            clearable
            nothingFoundMessage='موردی یافت نشد...'
          />

          <Space h='md' />
          <Controller
            name='director'
            render={({ field }) => <TextInput label='تجربه‌گردان' {...field} />}
          />
          <Space h='md' />
          <Controller
            name='directorBio'
            render={({ field }) => (
              <TextInput label='بایو تجربه‌گردان' {...field} />
            )}
          />
          <Space h='md' />
          <Controller
            name='directorRole'
            render={({ field }) => (
              <TextInput label='سمت تجربه‌گردان' {...field} />
            )}
          />
          <Space h='md' />
          <Controller
            name='neighborHood'
            render={({ field }) => <TextInput label='محله' {...field} />}
          />
          <Space h='md' />
          <Controller
            name='address'
            render={({ field }) => <TextInput {...field} label='آدرس' />}
          />
          <Space h='md' />
          <Controller
            name='locationLink'
            render={({ field }) => <TextInput {...field} label='لینک لوکیشن' />}
          />
          <Space h='md' />
          <ImageUploader />
        </div>
      )}

      <FooterActionBarTemplate>
        <Button>ساخت تجربه</Button>
      </FooterActionBarTemplate>
    </div>
  );
};

const NewExperienceFormContextProvider = () => {
  return (
    <NewExperienceFormContext.Provider>
      <NewExperience />
    </NewExperienceFormContext.Provider>
  );
};

export default NewExperienceFormContextProvider;
