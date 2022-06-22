import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Landing.module.css';
import bg from '../../assets/img/thrid.png';
import ListSkill from '../moleculs/list-skill';

export default function Second() {
  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.container}>
              <div className={styles.containerThrid}>
                <h1 className={styles.titleTalent}>Skill Talent</h1>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <ListSkill skill="Java" />
                      <ListSkill skill="Kotlin" />
                      <ListSkill skill="PHP" />
                      <ListSkill skill="JavaScript" />
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <ListSkill skill="Golang" />
                      <ListSkill skill="C++" />
                      <ListSkill skill="Ruby" />
                      <ListSkill skill="10+ Bahasa lainnya" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.container}>
              <Image src={bg} width={500} height={500} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
