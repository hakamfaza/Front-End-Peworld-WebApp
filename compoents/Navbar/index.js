import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';

import styles from '../../styles/components/Navbar.module.css';
import { HiOutlineMail } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import logo from '../../assets/icon/logo-purple.png';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const token = Cookies.get('token');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onLogin = () => {
    router.push('/login');
  };

  const onRegister = () => {
    router.push('/register');
  };

  return (
    <div>
      {isLoading ? null : (
        <nav className="navbar shadow-sm">
          <div className="container-fluid">
            <Link href="/home">
              <div className={styles.logo}>
                <Image src={logo} width={110} height={30} alt="" />
              </div>
            </Link>
            <div className="d-flex">
              {token ? (
                <div className={styles.boxSide}>
                  <IoMdNotificationsOutline className={styles.notif} />
                  <Link href="/message">
                    <div>
                      <HiOutlineMail className={styles.mail} />
                    </div>
                  </Link>
                  <Link href="/profile">
                    <div>
                      <Image src="/profile.png" width={26} height={26} className={styles.profile} alt="" />
                    </div>
                  </Link>
                </div>
              ) : (
                <div className={styles.boxAuth}>
                  <button className={styles.btnLogin} onClick={() => onLogin()}>
                    Masuk
                  </button>
                  <button className={styles.btnSignup} onClick={() => onRegister()}>
                    Daftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
