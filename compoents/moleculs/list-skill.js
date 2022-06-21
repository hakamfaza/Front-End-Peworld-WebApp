import React from 'react';
import styles from '../../styles/components/Moleculs.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function ListSkill(params) {
  return (
    <div className={styles.boxList}>
      <AiFillCheckCircle className={styles.checkSecond} />
      <li className={styles.list}>{params.skill}</li>
    </div>
  );
}
