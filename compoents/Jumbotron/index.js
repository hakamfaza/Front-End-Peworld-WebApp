import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Landing.module.css';
import bg from '../../assets/img/main.png';
import { useRouter } from 'next/router';

export default function Jumbotron() {
  const router = useRouter();
  const onClick = () => {
    router.push('/register');
  };
  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.container}>
              <div>
                <h1 className={styles.title}>Talenta terbaik negri untuk perubahan revolusi 4.0</h1>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
                </p>
                <button className={styles.btn} onClick={() => onClick()}>
                  Mulai Dari Sekarang
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.container}>
              <Image src={bg} width={500} height={500} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
