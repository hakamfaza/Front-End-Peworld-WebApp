import React from 'react';
import styles from '../../styles/Auth.module.css';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import AuthInput from '../../compoents/Input';

import logo from '../../assets/icon/logo.png';
import bg from '../../assets/img/agency.jpg';

export default function resetPassword() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peworld | Reset</title>
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
                  <Image src={bg} width={550} height={550} className={styles.image} alt="agency" />
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
                <AuthInput title="Email" type="email" name="email" placeholder="Masukan alamat email" />
                <button className={styles.btnRegister}>Send password reset email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
