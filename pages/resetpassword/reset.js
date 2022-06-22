import React from 'react';
import styles from '../../styles/Auth.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import AuthInput from '../../compoents/Input';

import logo from '../../public/logo.png';

export default function resetPassword() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peworld | Login</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="container-fuild">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.relative}>
              <div className={styles.bgImage}>
                <div className={styles.logo}>
                  <Image src={logo} width={86} height={25} className={styles.logo} alt="logo" />
                </div>
                <div>
                  <Image src="/image/agency.jpg" width={550} height={550} className={styles.image} alt="agency" />
                </div>
              </div>
              <h1 className={styles.title}>Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.formLogin}>
              <h1 className={styles.formTitle}>Reset password</h1>
              <p className={styles.formText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
              </p>
              <div className={styles.containerForm}>
                <AuthInput title="Kata sandi" type="password" placeholder="Masukan kata sandi" />
                <AuthInput title="Konfirmasi password baru" type="email" placeholder="Masukan konfirmasi kata sandi" />
                <button className={styles.btnRegister}>Reset password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
