import React from 'react';
import styles from '../../styles/components/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className="container">
        <Image src="/logo.svg" width={205} height={65} className={styles.logo} alt="" />
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
        </p>
        <hr className={styles.hr} />
        <div className={styles.cr}>
          <p>2020 Pewworld. All right reserved</p>
          <div className={styles.crInfo}>
            <p>Telepon</p>
            <p>Email</p>
          </div>
        </div>
      </div>
    </div>
  );
}
