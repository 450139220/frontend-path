import { useEffect, useState, type JSX } from 'react';
import styles from '../index.module.css';

interface CarouselObject {
  id: string;
  isBlank: boolean;
  href: string;
  imgUrl: string;
}
interface CarouselProps {
  items: CarouselObject[];
  len: number;
  interval: number;
}

function Carousel(props: CarouselProps): JSX.Element {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index) => (index < props.items.length - 1 ? index + 1 : 0));
    }, props.interval);
    return () => {
      clearInterval(timer);
    };
  }, [props.len]);

  return (
    <>
      <div
        className={styles['carousel-container']}
        style={{
          backgroundImage: `url(${props.items[index]?.imgUrl.split('&')[0]}&blur=40x20)`,
        }}
      >
        <div className={styles['carousel-container__all']}>
          <div className={styles['carousel-content']}>
            <div
              className={styles['carousel-prev']}
              onClick={() => {
                setIndex((index) =>
                  index > 0 ? index - 1 : props.items.length - 1,
                );
              }}
            ></div>
            <div
              className={styles['carousel-next']}
              onClick={() => {
                setIndex((index) =>
                  index < props.items.length - 1 ? index + 1 : 0,
                );
              }}
            ></div>
            <div className={styles['carousel-content__banner']}>
              <div
                className={styles['carousel-banner__all']}
                style={{ transform: `translateX(-${index * 730}px)` }}
              >
                {props.items.map((item) => (
                  <a
                    href={item.href}
                    key={item.id}
                    target={item.isBlank ? '_blank' : undefined}
                  >
                    <img src={item.imgUrl} alt="banner" />
                  </a>
                ))}
              </div>
              <div className={styles['carousel-banner__points']}>
                {props.items.map((item, idx) => (
                  <div
                    className={styles['carousel-banner__point']}
                    key={item.id}
                    style={{
                      backgroundPosition:
                        idx === index ? '-16px -343px' : '3px -343px',
                    }}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className={styles['carousel-content__download']}>
              <a href="/#/download">下载客户端</a>
              <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
              <span className={styles['carousel-download__shadow']}></span>
              <span className={styles['carousel-download__shadowr']}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export type { CarouselObject };
export default Carousel;
