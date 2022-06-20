import React from 'react';
import styles from '../../styles/Landing.module.css';

export default function Last() {
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
              <button className={styles.btnWhite}>Mulai Dari Sekarang</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
