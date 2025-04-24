import styles from '../App.module.css';
import type { JSX } from 'react';

function Footer(): JSX.Element {
  return (
    <>
      <div className={styles['footer']}>
        <div className={styles['footer-content']}>
          <div className={styles.enter}>
            <ul>
              <li>
                <a
                  className={styles['enter__1']}
                  href="https://developer.music.163.com/st/developer"
                  target="_blank"
                ></a>
                <span>音乐开放平台</span>
              </li>
              <li>
                <a
                  className={styles['enter__2']}
                  href="https://music.163.com/st/web-sublicense/home"
                  target="_blank"
                ></a>
                <span>云村交易所</span>
              </li>
              <li>
                <a
                  className={styles['enter__3']}
                  href="https://xstudio.music.163.com/"
                  target="_blank"
                ></a>
                <span>X StudioAI歌手</span>
              </li>
              <li>
                <a
                  className={styles['enter__4']}
                  href="https://xstudio.music.163.com/"
                  target="_blank"
                ></a>
                <span>用户认证</span>
              </li>
              <li>
                <a
                  className={styles['enter__5']}
                  href="https://tianyin.music.163.com/#/"
                  target="_blank"
                ></a>
                <span>AI 免费写歌</span>
              </li>
              <li>
                <a
                  className={styles['enter__6']}
                  href="https://music.163.com/st/ad-song"
                  target="_blank"
                ></a>
                <span>云推歌</span>
              </li>
              <li>
                <a
                  className={styles['enter__7']}
                  href="https://music.163.com/web/reward"
                  target="_blank"
                ></a>
                <span>赞赏</span>
              </li>
            </ul>
          </div>
          <div className={styles.copy}>🤯 不想写了，无聊的部分</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
