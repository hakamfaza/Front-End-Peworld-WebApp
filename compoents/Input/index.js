import React from 'react';
import styles from '../../styles/components/input.module.css';

export default function AuthInput(params) {
  return (
    <div className={styles.boxForm}>
      <label className={styles.textForm}>{params.title}</label>
      <input
        type={params.type}
        name={params.name}
        className={styles.input}
        placeholder={params.placeholder}
        onChange={params.onChange}
        defaultValue={params.defaultValue}
      />
    </div>
  );
}
