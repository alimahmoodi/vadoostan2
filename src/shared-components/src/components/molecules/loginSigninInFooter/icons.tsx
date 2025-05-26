'use client';
import { colors } from '@/colors';
interface Props {
  isActive: boolean;
}
const ProfileIcon = ({ isActive }: Props) => {
  const strokeColor = isActive ? colors['cta-color'] : '#000001';
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='27'
      height='27'
      viewBox='0 0 27 27'
      fill='none'
    >
      <g clipPath='url(#clip0_1_4802)'>
        <path
          d='M13.4993 13.5001C16.9609 13.5001 19.7672 10.6939 19.7672 7.23221C19.7672 3.77057 16.9609 0.964355 13.4993 0.964355C10.0377 0.964355 7.23145 3.77057 7.23145 7.23221C7.23145 10.6939 10.0377 13.5001 13.4993 13.5001Z'
          stroke={strokeColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M25.4182 26.0356C24.6085 23.5109 23.018 21.3084 20.876 19.7459C18.734 18.1833 16.151 17.3413 13.4996 17.3413C10.8482 17.3413 8.2653 18.1833 6.12326 19.7459C3.98121 21.3084 2.39071 23.5109 1.58105 26.0356H25.4182Z'
          stroke={strokeColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_4802'>
          <rect width='27' height='27' fill='white' />
        </clipPath>
      </defs>
      <script />
    </svg>
  );
};

const ExperienceListIcon = ({ isActive }: Props) => {
  const strokeColor = isActive ? colors['cta-color'] : '#000001';
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
    >
      <path
        d='M24.715 11.2705H16.4293C15.8573 11.2705 15.3936 11.7342 15.3936 12.3062V24.7348C15.3936 25.3068 15.8573 25.7705 16.4293 25.7705H24.715C25.287 25.7705 25.7507 25.3068 25.7507 24.7348V12.3062C25.7507 11.7342 25.287 11.2705 24.715 11.2705Z'
        stroke={strokeColor}
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.715 1.03564H16.4293C15.8573 1.03564 15.3936 1.49935 15.3936 2.07136V6.23493C15.3936 6.80694 15.8573 7.27064 16.4293 7.27064H24.715C25.287 7.27064 25.7507 6.80694 25.7507 6.23493V2.07136C25.7507 1.49935 25.287 1.03564 24.715 1.03564Z'
        stroke={strokeColor}
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.3576 1.03564H2.07185C1.49984 1.03564 1.03613 1.49935 1.03613 2.07136V14.4999C1.03613 15.0719 1.49984 15.5356 2.07185 15.5356H10.3576C10.9296 15.5356 11.3933 15.0719 11.3933 14.4999V2.07136C11.3933 1.49935 10.9296 1.03564 10.3576 1.03564Z'
        stroke={strokeColor}
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.3576 19.5356H2.07185C1.49984 19.5356 1.03613 19.9993 1.03613 20.5714V24.7349C1.03613 25.3069 1.49984 25.7706 2.07185 25.7706H10.3576C10.9296 25.7706 11.3933 25.3069 11.3933 24.7349V20.5714C11.3933 19.9993 10.9296 19.5356 10.3576 19.5356Z'
        stroke={strokeColor}
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export { ProfileIcon, ExperienceListIcon };
