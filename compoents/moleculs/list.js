import React from 'react';
import styles from '../../styles/components/Moleculs.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function List() {
  return (
    <div className={styles.boxList}>
      <AiFillCheckCircle className={styles.check} />
      <li className={styles.list}>Lorem ipsum dolor sit amet.</li>
    </div>
  );
}
