/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../../styles/components/Card.module.css';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Portfolio(params) {
  return (
    <div className={styles.boxPorto}>
      <div>
        <img src={`${params.image}`} className={styles.imgPorto} alt="" />
      </div>
      <p className={styles.textPorto}>{params.title}</p>
      <AiOutlineDelete className={styles.delete} onClick={params.onClick} />
    </div>
  );
}
