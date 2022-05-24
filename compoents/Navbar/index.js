import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/components/Navbar.module.css'
import { HiOutlineMail } from 'react-icons/hi'
import {IoMdNotificationsOutline} from 'react-icons/io'

export default function Navbar() {
  return (
    <div >
      <nav className="navbar shadow-sm">
        <div className="container-fluid">
          <Link href='/' >
            <div className={styles.logo} >
            <Image src='/logo-purple.svg' width={125} height={30} />
            </div>
          </Link>
          <div className="d-flex">
            <div className={styles.boxSide} >
              <IoMdNotificationsOutline className={styles.notif} />
              <HiOutlineMail className={styles.mail} />
              <Link href='/profile'>
              <Image src='/nial.jpg' width={25} height={25} className={styles.profile} />
              </Link>
            <div>
            </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
