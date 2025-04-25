import styles from './index.module.css';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { request } from '@/service/request';
import Carousel, { CarouselObject } from './comp/carousel';
import Title from './comp/title';

interface HotRecommend {
  id: number;
  playlistId: number;
  name: string;
  imgUrl: string;
  isRadio: boolean;
  number: string;
}

function Recommend(): JSX.Element {
  const [carouselData, setCarouselData] = useState<CarouselObject[]>([]);
  const [carouselLen, setCarouselLen] = useState<number>(0);

  const titleContent = ['华语', '流行', '摇滚', '民谣', '电子'];

  const [hotRecommends, setHotRecommends] = useState<HotRecommend[]>([]);

  useEffect(() => {
    request('/').then((res) => {
      setCarouselData(res.data);
      setCarouselLen(res.data.length);
    });

    request('/hot_recommend_list').then((res) => {
      setHotRecommends(res.data);
    });
  }, []);

  const handlePlaySong = (id: number) => {
    console.log(id);
  };

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
            <Title
              name="热门推荐"
              content={titleContent}
              to="/#/discover/playlist"
            >
              <div className={styles['l']}>
                {hotRecommends.map((item, index) => (
                  <div key={index}>
                    <div className={styles['l-content']}>
                      <div className={styles['l-cover']}>
                        <img src={item.imgUrl} alt="cover" />
                        <a href={`/#/playlist?id=${item.playlistId}`}></a>
                        <div className={styles['l-bottom']}>
                          <a
                            href="javascript:;"
                            onClick={() => handlePlaySong(item.id)}
                          ></a>
                          <span className={styles['l-bottom__headset']}></span>
                          <span className={styles['l-bottom__nb']}>
                            {item.number}
                          </span>
                        </div>
                      </div>
                      <p className={styles['l-name']}>
                        {item.isRadio && <i></i>}
                        <a href={`/#/playlist?id=${item.id}`}>{item.name}</a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Title>
            <Title name="个性化推荐">
              <div className={styles['l']}>
                <div className={styles['l-content']}>
                  <div className={styles['taste-1']}>
                    <a
                      className={styles['taste-1__btn']}
                      href="/#/discover/recommend/taste"
                    >
                      <span className={styles['taste-1__head']}>
                        星期
                        {(() => {
                          const day = new Date().getDay();
                          const map = [
                            '一',
                            '二',
                            '三',
                            '四',
                            '五',
                            '六',
                            '天',
                          ];
                          return map[day - 1];
                        })()}
                      </span>
                      <span className={styles['taste-1__bd']}>
                        {new Date().getDate()}
                      </span>
                      <span className={styles['taste-1__bg']}></span>
                    </a>
                    <p className={styles['dec']}>
                      <a href="/#/discover/recommend/taste">每日歌曲推荐</a>
                    </p>
                    <p className={styles['idv']}>
                      根据你的口味生成，
                      <br></br>
                      每天6:00更新
                    </p>
                  </div>
                </div>
              </div>
            </Title>
            <Title name="新碟上架" to="/#/discover/album"></Title>
            <Title name="榜单" to="/#/discover/toplist"></Title>
          </div>
          <div className={styles['content-r']}></div>
        </div>
      </div>
    </>
  );
}

export default Recommend;
