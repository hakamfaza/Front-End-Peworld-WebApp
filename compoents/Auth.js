import React from "react";
import styles from '../styles/components/Auth.module.css'
import Image from "next/image";
import Link from "next/link";

export default function Auth() {
  return (
    <div className={styles.container} >
      <div className="container-fuild">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.relative}>
              <div className={styles.bgImage}>
                <div className={styles.logo}>
                <Image src="/logo.svg" width={86} height={25} className={styles.logo} />
                </div>
                <div>
                  <Image src='/image/agency.jpg' width={600} height={600} className={styles.image} />
                </div>
              </div>
              <h1 className={styles.title} >Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.form}>
              <h1 className={styles.formTitle} >Halo, Pewpeople</h1>
              <p className={styles.formText} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
              <div className={styles.containerForm} >
                <div className={styles.boxForm} >
                  <p className={styles.textForm} >Email</p>
                  <input name="email" className={styles.input} placeholder="Masukan alamat email" />
                </div>
                <div className={styles.boxForm}>
                  <p className={styles.textForm}>Password</p>
                  <input type='password' name="email" className={styles.input} placeholder="Masukan kata sandi" />
                </div>
                <Link href="/forgot">
                  <p className={styles.forgot}>Forgot password?</p>
                </Link>
                <button className={styles.btn}>Masuk</button>
                <div className={styles.to}>
                  <p>Anda belum punya akun?</p><Link href="/register"><p className={styles.toPage} >Daftar disini</p></Link>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
