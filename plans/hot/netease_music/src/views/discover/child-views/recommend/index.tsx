import styles from './index.module.css';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { request } from '@/service/request';
import Carousel, { CarouselObject } from './comp/carousel';

function Recommend(): JSX.Element {
  const [carouselData, setCarouselData] = useState<CarouselObject[]>([]);
  const [carouselLen, setCarouselLen] = useState<number>(0);

  useEffect(() => {
    request('/').then((res) => {
      setCarouselData(res.data);
      setCarouselLen(res.data.length);
    });
  }, []);

  return (
    <>
      <Carousel
        items={carouselData}
        len={carouselLen}
        interval={5000}
        fadeTime={500}
      />
      <div className={styles['content']}>
        <div className={styles['content-l']}></div>
        <div className={styles['content-r']}></div>
      </div>
    </>
  );
}

export default Recommend;
