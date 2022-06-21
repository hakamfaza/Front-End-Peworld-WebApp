import React from 'react';
import styles from '../../styles/components/Card.module.css';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Experience(params) {
  return (
    <div className={styles.boxExperience}>
      <div className={styles.boxImageExp}>
        <Image src={`${params.image}`} width={200} height={200} className={styles.img} alt="" />
        <AiOutlineDelete className={styles.deleteExp} onClick={params.onClick} />
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
