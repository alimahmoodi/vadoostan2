/* eslint-disable @next/next/no-img-element */
import useEmblaCarousel from 'embla-carousel-react';
import classes from './style.module.scss';
import { useDotButton } from './useDotBotton';
import classNames from 'classnames';
import { baseUrl } from '@/services/apiClient';
import Image from 'next/image';

export const Carousel = ({
  imagesUrl,
}: {
  imagesUrl: string[] | undefined;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { scrollSnaps, selectedIndex, onDotButtonClick } =
    useDotButton(emblaApi);

  const slides = (imagesUrl || []).map((url, index) => {
    return (
      <div key={index} className={classes['embla__slide']}>
        <Image
          width={200}
          height={200}
          className={classes['image']}
          src={`https://${baseUrl}${url}`}
          alt='slide1'
        />
      </div>
    );
  });

  return (
    <div className={classes['embla']} ref={emblaRef}>
      <div className={classes['embla__container']}>
        {slides.map((item) => item)}
      </div>
      <div className={classes['dot-container']}>
        {scrollSnaps.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                onDotButtonClick(index);
              }}
              className={classNames(
                classes['dot'],
                index === selectedIndex && classes['dot--selected']
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
