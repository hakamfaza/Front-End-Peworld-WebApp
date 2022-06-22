/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Auth.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/logo.png';

export default function register() {
  const router = useRouter();

  const onWorker = () => {
    router.push('/register/worker');
  };

  const onRecruiter = () => {
    router.push('/register/recruiter');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Peworld | Register</title>
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
              <h1 className={styles.formTitle}>Halo, Pewpeople</h1>
              <p className={styles.formText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
              </p>
              <div className={styles.containerForm}>
                <button className={styles.btn} onClick={e => onWorker(e)}>
                  Daftar sebagai pekerja
                </button>
                <button className={styles.btnRecruiter} onClick={e => onRecruiter(e)}>
                  Daftar sebagai recruiter
                </button>
                <div className={styles.to}>
                  <p>Anda sudah punya akun?</p>
                  <Link href="/login">
                    <p className={styles.toPage}>Masuk disini</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
