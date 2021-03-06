/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthInput from '../../compoents/Input';
import axios from 'axios';
import Swal from 'sweetalert2';

import logo from '../../assets/icon/logo.png';
import bg from '../../assets/img/agency.jpg';

export default function index() {
  const router = useRouter();
  const [getForm, setForm] = useState({
    email: '',
    password: ''
  });

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const body = {
      email: getForm.email,
      password: getForm.password
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, body, {})
      .then(async res => {
        const token = res.data.token.jwt;
        const id = res.data.token.id;
        const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
          headers: {
            token
          }
        });
        const isRecruiter = getUser.data.data.user.recruiter;
        document.cookie = `token=${token};path/`;
        document.cookie = `id=${id};path/`;
        document.cookie = `isRecruiter=${isRecruiter};path/`;
        Swal.fire({
          icon: 'success',
          title: 'Sucess to login!',
          showConfirmButton: false,
          timer: 1800
        });
        router.push('/profile');
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.error,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

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
                  <Image src={logo} width={86} height={25} className={styles.logo} alt="" />
                </div>
                <div>
                  <Image src={bg} width={550} height={550} className={styles.image} alt="" />
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
                <AuthInput type="email" name="email" placeholder="Masukan email" onChange={e => onChange(e, 'email')} />
                <AuthInput type="password" placeholder="Masukan kata sandi" onChange={e => onChange(e, 'password')} />
                <Link href="/forgot">
                  <p className={styles.forgot}>Forgot password?</p>
                </Link>
                <button className={styles.btn} onClick={e => onSubmit(e)}>
                  Masuk
                </button>
                <div className={styles.to}>
                  <p>Anda belum punya akun?</p>
                  <Link href="/register">
                    <p className={styles.toPage}>Daftar disini</p>
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
