import React from "react";
import Image from 'next/image'
import styles from '../../styles/components/Card.module.css'

export default function Card(params) {
  return (
    <div className="container shadow-sm">
        <div className="row">
          <div className="col-md-2">
            <div className={styles.boxImage}>
              <Image src="/nial.jpg" width={80} height={80} className={styles.user}/>
            </div>
          </div>
          <div className="col-md-8">
            <div className= {styles.info}>
            <h3 className={styles.name} >{params.name}</h3>
            <h6 className={styles.titleProfession}>{ params.proffesion}</h6>
              <div className={styles.location} >
                <Image src="/location.svg" width={16} height={16} className={styles.icon} />
              <p className={styles.textLocation}>{params.address}</p>
              </div>
              <div className={styles.boxSkill} >
                <div className={styles.skill} >Javascript</div>
                <div className={styles.skill} >PHP</div>
                <div className={styles.skill} >Java</div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className={styles.boxBtn} >
              <button className={styles.btn} >Lihat Profile</button>
            </div>
          </div>
      </div>  
    </div>
  )
}
