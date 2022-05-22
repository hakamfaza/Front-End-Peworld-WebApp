import React from "react";
import styles from '../../styles/components/Card.module.css'

export default function Skills(params) {
  return (
    <div className={styles.skill} >{params.skill}</div>
  )
}
