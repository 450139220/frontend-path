import styles from './index.module.css';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { request } from '@/service/request';
import Carousel, { CarouselObject } from './comp/carousel';
import Title from './comp/title';

function Recommend(): JSX.Element {
  const [carouselData, setCarouselData] = useState<CarouselObject[]>([]);
  const [carouselLen, setCarouselLen] = useState<number>(0);

  useEffect(() => {
    request('/').then((res) => {
      setCarouselData(res.data);
      setCarouselLen(res.data.length);
    });
  }, []);

  const titleContent = ['华语', '流行', '摇滚', '民谣', '电子'];

  return (
    <>
      <Carousel
        items={carouselData}
        len={carouselLen}
        interval={5000}
        fadeTime={500}
      />
      <div className={styles['content__bg']}>
        <div className={styles['content']}>
          <div className={styles['content-l']}>
            <div className={styles['l-1']}>
              <Title
                name="热门推荐"
                content={titleContent}
                to="/#/discover/playlist"
              >
                <div>123</div>
              </Title>
              <Title name="个性化推荐"></Title>
              <Title name="新碟上架" to="/#/discover/album"></Title>
              <Title name="榜单" to="/#/discover/toplist"></Title>
            </div>
          </div>
          <div className={styles['content-r']}></div>
        </div>
      </div>
    </>
  );
}

export default Recommend;
