import React from 'react';
import styles from '../../styles/Landing.module.css';
import { useRouter } from 'next/router';

export default function Last() {
  const router = useRouter();
  const onClick = () => {
    router.push('/register');
  };
  return (
    <div className={styles.lastContainer}>
      <div className={styles.object}>
        <div className="row">
          <div className="col-md-6">
            <div className={styles.boxLastTitle}>
              <h1 className={styles.lastTitle}>Lorem ipsum dolor sit amet</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.boxBotton}>
              <button className={styles.btnWhite} onClick={() => onClick()}>
                Mulai Dari Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
