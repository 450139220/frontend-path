import styles from '../index.module.css';
import type { JSX, ReactNode } from 'react';

interface TitleProps {
  name: string;
  content?: string[];
  to?: string;
  children?: ReactNode;
}

function Title(props: TitleProps): JSX.Element {
  return (
    <div>
      <div className={styles['title-content']}>
        {props.to ? (
          <a className={styles['title-content__to']} href={props.to}>
            {props.name}
          </a>
        ) : (
          <div className={styles['title-content__to']}>{props.name}</div>
        )}
        {props.content ? (
          <div className={styles['title-content__tab']}>
            {props.content.map((item, index) => {
              if (index === props.content!.length - 1) {
                return (
                  <div key={index}>
                    <a href={`/#/discover/playlist?cat=${item}`}>{item}</a>
                  </div>
                );
              }
              return (
                <div key={index}>
                  <a href={`/#/discover/playlist?cat=${item}`}>{item}</a>
                  <span>|</span>
                </div>
              );
            })}
          </div>
        ) : null}
        {props.to && (
          <div className={styles['title-content__more']}>
            <a href="/#/discover/playlist">更多</a>
            <i>&nbsp;</i>
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
}

export default Title;
