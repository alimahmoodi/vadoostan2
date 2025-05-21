// hooks/useUsers.ts
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { getAxiosInstance } from './apiClient';
import { getCookie } from 'cookies-next';

const mockDataForExpCreation = {
  data: {
    templates: [
      {
        exp: {
          id: 'khsghjf',
          categoryId: 1,
          cityId: 1,
          title: 'موسیقی ایران',
          description: 'ها ها هااااااای',
          label: null,
          isSeries: true,
          creatorUserId: '01JRN3MW7RYT8TPDZYVAG51751',
        },
        faqs: [
          {
            question:
              'می‌تونم گربه‌مو بیارم؟می‌تونم گربه‌مو بیارم؟ می‌تونم گربه‌مو بیارم؟',
            answer:
              'صددرصد. اگه گربه دارید برای شما 120% تخفیف درنظر گرفته می‌شه.',
          },
          {
            question:
              'باید خودم دسته بیارمباید خودم دسته بیارم؟؟ باید خودم دسته بیارم؟',
            answer: 'نه دسته اضافه داریم',
          },
        ],
        medias: [
          {
            url: '/public/experience/skjdfbhsf/first.jpg',
            type: 'photo',
          },
          {
            url: '/public/experience/skjdfbhsf/second.jpg',
            type: 'photo',
          },
          {
            url: '/public/experience/skjdfbhsf/third.jpg',
            type: 'photo',
          },
        ],
      },
    ],
    inclusions: [
      {
        id: 1,
        title: 'پذیرایی',
      },
      {
        id: 2,
        title: 'شاباش',
      },
    ],
    venues: [
      {
        id: 1,
        title: 'کافه رایا',
      },
    ],
    directors: [
      {
        userId: '01JRN3MW7RYT8TPDZYVAG51751',
        name: 'محمد سیفی',
        bio: 'حاج ممد هستم',
        photoUrl: '/public/director/jjj.jpeg',
      },
      {
        userId: '01JRN3MW7RYT8TPDZAG51751111',
        name: 'نام تست',
        bio: 'حاج ممد هستم',
        photoUrl: '/public/director/jjj.jpeg',
      },
    ],
    assistants: [],
    categories: [
      {
        id: 1,
        title: 'موسیقی',
      },
      {
        id: 2,
        title: 'بازی',
      },
      {
        id: 3,
        title: 'خلق',
      },
      {
        id: 4,
        title: 'فیلم',
      },
      {
        id: 5,
        title: 'آشپزی',
      },
    ],
  },
};

type ClientType = 'web' | 'telegram';

type ExperienceStatus = 'PUBLISHED';

export interface Experience {
  id: string;
  title: string;
  category: string;
  price: number;
  date: string;
  address: string;
  isFilled: boolean;
}

interface ExperiencesListResponce extends Response {
  result: {
    count: number;
    exps: Experience[];
  };
}

interface UserExperienceListResponse extends Response {
  result: {
    count: number;
    exps: (Experience & { status: 'inactive' | 'published' })[];
  };
}

interface Response {
  isSuccessful: boolean;
  message: string;
  traceId: string;
  errorCode: number;
}

interface LoginRequestProps {
  mobileNumber: string;
  client: ClientType;
}

interface SignupRequestProps {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  client: ClientType;
}
type SignupResponseProps = Response;

interface OTPverifyRequestProps {
  mobileNumber: string;
  otp: string;
  client: ClientType;
}

interface OTPverifyResponseProps extends Response {
  errorCode: number;
  result: {
    token: string;
  };
}

interface GetUserExpListProps {
  userId: string | undefined;
  // status: 'inactive' | 'published';
}

export interface ExperienceDetailResponse extends Response {
  result: {
    title: string;
    description: {
      main: string;
    };
    date: string;
    address: string;
    price: number;
    directors: [
      {
        name: string;
        bio: string;
        photoUrl: string;
      },
    ];
    expPhotos: string[];
    faqs: [
      {
        question: string;
        answer: string;
      },
    ];
    inclusions: string[];
  };
}

interface GetInvoiceResponseProps extends Response {
  result: {
    expPrice: number;
    tax: number;
    payable: number;
  };
}

interface GetInvoiceRequestProps {
  id: string | null;
}

export interface GetDataForExperienceCreationProps extends Response {
  result: {
    templates: {
      exp: {
        id: string;
        categoryId: number;
        cityId: number;
        title: string;
        description: string;
        label: null;
        isSeries: boolean;
        creatorUserId: string;
      };
      faqs: {
        question: string;
        answer: string;
      }[];
      medias: {
        url: string;
        type: string;
      }[];
    }[];
    inclusions: {
      id: number;
      title: string;
    }[];
    venues: {
      id: number;
      title: string;
    }[];
    directors: {
      userId: string;
      name: string;
      bio: string;
      photoUrl: string;
    }[];
    assistants: string[];
    categories: {
      id: number;
      title: string;
    }[];
  };
}

interface CreateExperienceProps {
  title: string;
  description: string;
  categoryId: number;
  faqs: {
    question: string;
    answer: string;
  }[];
  isSeries: boolean;
  creatorUserId: string;
  sessions: {
    time: string; // Format: "YYYY-MM-DD HH:mm:ss"
    description: string;
    publishTime: string; // Format: "YYYY-MM-DD HH:mm:ss"
    duration: number; // in hours
    venueId: number;
    price: number; // in currency units
    capacity: number;
    groupLink: string;
    allowedGender: 'all' | 'male' | 'female';
    directorsUserId: string[];
    assistantsUserId: string[];
  }[];
}

const getInvoice = async (
  args: GetInvoiceRequestProps
): Promise<GetInvoiceResponseProps> => {
  const { data } = await getAxiosInstance().get(
    `/api/payments/${args.id}/invoice`
  );
  return data;
};

const verifyOtp = async (
  args: OTPverifyRequestProps
): Promise<OTPverifyResponseProps> => {
  const { data } = await getAxiosInstance().post('/api/auth/verify-otp', args);
  return data;
};

const fetchUsers = async (
  args: SignupRequestProps
): Promise<SignupResponseProps> => {
  const { data } = await getAxiosInstance().post('/api/auth/signup', args);
  return data;
};

const login = async (args: LoginRequestProps): Promise<Response> => {
  const { data } = await getAxiosInstance().post('/api/auth/login', args);
  return data;
};

const getExpList = async ({
  status,
}: {
  status: ExperienceStatus;
}): Promise<ExperiencesListResponce> => {
  const { data } = await getAxiosInstance().get('/api/user/experiences', {
    params: {
      status,
    },
  });
  return data;
};

const getExperienceDetail = async ({
  id,
}: {
  id: string;
}): Promise<ExperienceDetailResponse> => {
  const { data } = await getAxiosInstance().get(`/api/user/experiences/${id}`);
  return data;
};

const getUserExpList = async ({
  userId,
}: GetUserExpListProps): Promise<UserExperienceListResponse> => {
  const token = getCookie('token') as string;
  const { data } = await getAxiosInstance().get(
    `/api/users/${userId}/experiences`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return data;
};

const getDataForExperienceCreation =
  async (): Promise<GetDataForExperienceCreationProps> => {
    const token = getCookie('token') as string;
    const { data } = await getAxiosInstance().get(
      '/api/admin/experiences/creation/data',
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    data.result = mockDataForExpCreation.data;
    return data;
  };

const createExperience = async (
  args: CreateExperienceProps
): Promise<Response> => {
  const { data } = await getAxiosInstance().post('/api/auth/login', args);
  return data;
};

export function useGetExperienceDetail({ id }: { id: string }) {
  return useQuery({
    queryKey: ['experience', id],
    queryFn: () => getExperienceDetail({ id }),
  });
}

export function useGetInvoice({ id }: GetInvoiceRequestProps) {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: id ? () => getInvoice({ id }) : skipToken,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: fetchUsers,
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export function useCreateExperience() {
  return useMutation({
    mutationFn: createExperience,
  });
}

export function useGetExperienceList({ status }: { status: ExperienceStatus }) {
  return useQuery({
    queryKey: ['experiences', status],
    queryFn: () => getExpList({ status }),
  });
}

export function useGetUserExperienceList({ userId }: GetUserExpListProps) {
  return useQuery({
    queryKey: ['user-experiences', userId],
    queryFn: userId ? () => getUserExpList({ userId }) : skipToken,
  });
}

export function useGetDataForExperienceCreation() {
  return useQuery({
    queryKey: ['/api/admin/experiences/creation/data'],
    queryFn: () => getDataForExperienceCreation(),
  });
}
