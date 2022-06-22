import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Message.module.css';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';

const message = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peworld | Login</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="container">
        <div className={styles.boxMessage}>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.boxUser}>
                <h4 className={styles.title}>Chat</h4>
                <hr />
                <div className={styles.boxInfo}>
                  <div>
                    <Image src="/nial.jpg" width={45} height={45} className={styles.profile} alt="" />
                  </div>
                  <div className={styles.boxTitleName}>
                    <h6 className={styles.titleName}>Jonas Adam</h6>
                    <p className={styles.message}>Lorem ipsum dolor</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className={styles.containerMessage}>
                <div className={styles.boxInfoUser}>
                  <div>
                    <Image src="/nial.jpg" width={45} height={45} className={styles.profile} alt="" />
                  </div>
                  <div className={styles.profileUser}>
                    <h6 className={styles.titleName}>Jonas Adam</h6>
                  </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.boxInput}>
                  <input type="text" className={styles.input} placeholder="type message..."></input>
                  <button className={styles.send}>
                    <FiSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

message.layouts = 'L1';
export default message;
