/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import React from 'react';
import styles from '../../styles/components/Card.module.css';

export default function Profile(params) {
  return (
    <div className={styles.containerProfile}>
      <div>
        <div className={styles.borderProfile}>
          <Image src={params.image} width={100} height={100} objectFit="cover" className={styles.profile} />
        </div>
      </div>
      <div className={styles.information}>
        <h4 className={styles.titleName}>{params.name}</h4>
        <h6 className={styles.profession}>{params.profession}</h6>
        <p className={styles.descriptionProfile}>{params.description}</p>
      </div>
    </div>
  );
}
