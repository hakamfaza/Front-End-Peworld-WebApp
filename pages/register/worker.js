/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthInput from '../../compoents/Input';
import axios from 'axios';
import Swal from 'sweetalert2';

import logo from '../../public/logo.png';

export default function registerWorker() {
  const router = useRouter();
  const [getForm, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    recruiter: false,
    password: '',
    confirm: ''
  });

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value
    });
  };

  const onClick = e => {
    e.preventDefault();
    if (getForm.password === getForm.confirm) {
      const body = {
        name: getForm.name,
        email: getForm.email,
        phone: getForm.phone,
        position: getForm.position,
        company: getForm.company,
        recruiter: getForm.recruiter,
        password: getForm.password
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/register`, body, {})
        .then(res => {
          res;
          Swal.fire({
            icon: 'success',
            title: 'Sucess register!',
            showConfirmButton: false,
            timer: 1800
          });
          router.push('/login');
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to login!',
            showConfirmButton: false,
            timer: 1800
          });
        });
    } else {
      alert('Password not same!');
    }
  };
  return (
    <div className={styles.container}>
      <div className="container-fuild">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.relative}>
              <div className={styles.bgImage}>
                <div className={styles.logo}>
                  <Image src={logo} width={86} height={25} className={styles.logo} alt="logo" />
                </div>
                <div>
                  <Image src="/image/agency.jpg" width={550} height={550} className={styles.image} alt="ageny" />
                </div>
              </div>
              <h1 className={styles.title}>Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.formWorker}>
              <h1 className={styles.formTitle}>Halo, Pewpeople</h1>
              <p className={styles.formText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
              </p>
              <div className={styles.containerForm}>
                <AuthInput title="Nama" placeholder="Masukan nama lengakap" onChange={e => onChange(e, 'name')} />
                <AuthInput
                  title="Email"
                  type="email"
                  name="email"
                  placeholder="Masukan alamat email"
                  onChange={e => onChange(e, 'email')}
                />
                <AuthInput
                  title="No handphone"
                  type="text"
                  placeholder="Masukan no handphone"
                  onChange={e => onChange(e, 'phone')}
                />
                <AuthInput
                  title="Kata sandi"
                  type="password"
                  placeholder="Masukan kata sandi"
                  onChange={e => onChange(e, 'password')}
                />
                <AuthInput
                  title="Konfirmasi kata sandi"
                  type="password"
                  placeholder=" Masukan konfirmasi kata sandi"
                  onChange={e => onChange(e, 'confirm')}
                />
                <button className={styles.btnRegister} onClick={e => onClick(e)}>
                  Masuk
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
