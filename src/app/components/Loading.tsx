'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [shutterClosed, setShutterClosed] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setShutterClosed(true);
      setTimeout(() => {
        setVisible(false);
      }, 1000); // Время для завершения анимации
    };

    // Проверка, если страница уже загружена
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div id='loading-wrapper' className={`${styles.loadingWrapper} ${!visible ? styles.hidden : ''}`}>
      <div id='loading-animation' className={styles.loadingAnimation}>
        <div className={`${styles.shtorka} ${shutterClosed ? styles.shtorkaClosed : ''}`}></div>
        <Image src='/logo-animation.png' width={889} height={400} alt='Loading Logo' />
      </div>
    </div>
  );
};

export default Loading;
