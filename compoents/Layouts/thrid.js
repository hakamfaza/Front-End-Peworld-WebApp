import React from 'react';
import styles from '../../styles/Landing.module.css';
import Profile from '../Card/profile';

export default function Thrid() {
  return (
    <div className={styles.containerFourth}>
      <div>
        <h1 className={styles.titleAbout}>Their opinion about peworld</h1>
      </div>
      <div className={styles.boxProfile}>
        <dvi className="row">
          <div className="col-md-4 d-flex align-items-center ustify-content-center">
            <Profile
              name="Harry Styles"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."
              profesiion="Web Developer"
              image="/heri.jpg"
            />
          </div>
          <div className="col-md-4">
            <Profile
              name="Niall Horan"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              profesiion="Web Developer"
              image="/nial.jpg"
            />
          </div>
          <div className="col-md-4">
            <Profile
              name="Louis Tomlinson"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              profesiion="Web Developer"
              image="/luis.jpg"
            />
          </div>
        </dvi>
      </div>
    </div>
  );
}
