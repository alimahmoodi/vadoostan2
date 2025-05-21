import { createFormContext } from '@/app/utils';

interface NewExperienceFormContextProps {
  name: string;
  description: string;
  category: string;
  duration: string;
  date: string;
  timeOfStart: string;
  price: string;
  capacity: number | undefined;
  telegramLink: string;
  inclutions: string[];
  faq: string[];
  address: string;
  neighborHood: string;
  locationLink: string;
  director: string;
  directorRole: string;
  directorBio: string;
  venue: string;
}

export const NewExperienceFormContext =
  createFormContext<NewExperienceFormContextProps>({
    address: '',
    capacity: undefined,
    category: '',
    date: '',
    description: '',
    duration: '',
    faq: [],
    inclutions: [],
    locationLink: '',
    name: '',
    price: '',
    telegramLink: '',
    timeOfStart: '',
    neighborHood: '',
    director: '',
    directorBio: '',
    directorRole: '',
    venue: '',
  });
