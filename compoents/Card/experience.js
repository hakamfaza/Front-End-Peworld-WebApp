import React from 'react';
import styles from '../../styles/components/Card.module.css';
import Image from 'next/image';

export default function Experience(params) {
  return (
    <div className={styles.boxExperience}>
      <div>
        <Image src={`${params.image}`} width={200} height={200} className={styles.img} />
      </div>
      <div className={styles.boxExp}>
        <h5 className={styles.titleJob}>{params.job}</h5>
        <p className={styles.company}>{params.company}</p>
        <p className={styles.date}>{params.date}</p>
        <p className={styles.descriptionExp}>{params.description}</p>
      </div>
    </div>
  );
}
