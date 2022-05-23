import React from "react";
import styles from '../../styles/components/input.module.css'

export default function AuthInput(params) {
  return (
    <div className={styles.boxForm} >
      <p className={styles.textForm} >{params.title}</p>
      <input type={params.type} name={params.name} className={styles.input} placeholder={params.placeholder} onChange={params.onChange} />
    </div>
  )
}
