import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Landing.module.css';
import bg from '../../assets/img/second.png';
import { useRouter } from 'next/router';
import List from '../moleculs/list';

export default function Main() {
  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.container}>
              <Image src={bg} width={500} height={500} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.sideContainer}>
              <h1>Kenapa harus mencari tallent di peworld</h1>
              <ul className={styles.list}>
                <List />
                <List />
                <List />
                <List />
                <List />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
