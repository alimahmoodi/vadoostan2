'use client';
import { Button, Image, Text } from '@mantine/core';
import classes from './style.module.scss';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const onChange = (
    imageList: ImageListType
    // addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        // maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          //   onImageRemoveAll,
          //   onImageUpdate,
          onImageRemove,
          //   isDragging,
          dragProps,
        }) => (
          <div className='upload__image-wrapper'>
            <Button {...dragProps} onClick={onImageUpload}>
              انتخاب عکس
            </Button>
            {imageList.length === 0 ? (
              <Text style={{ marginTop: 8 }} size='lg'>
                عکسی بارگزاری نشده است!
              </Text>
            ) : (
              <div className={classes['images']}>
                {imageList.map((image, index) => (
                  <div key={index} className={classes['image-wrapper']}>
                    <Image
                      radius={'sm'}
                      h={200}
                      w={'auto'}
                      fit={'cover'}
                      src={image.dataURL}
                      alt='image'
                      styles={{
                        root: {
                          border: '1px solid #ced4da',
                        },
                      }}
                    />
                    <Button
                      onClick={() => onImageRemove(index)}
                      bg={'#ee3f56'}
                      //   onClick={onRemoveFilter}
                      className={classes['remove-filter']}
                      styles={{ label: { textAlign: 'center' } }}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </>
  );
};

export { ImageUploader };
