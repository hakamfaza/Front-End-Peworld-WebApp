import React from 'react';
import styles from '../../styles/Landing.module.css';
import Profile from '../Card/profile';
import userOne from '../../assets/img/heri.jpg';
import userSecond from '../../assets/img/nial.jpg';
import userThrid from '../../assets/img/luis.jpg';

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
              image={userOne}
            />
          </div>
          <div className="col-md-4">
            <Profile
              name="Niall Horan"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              profesiion="Web Developer"
              image={userSecond}
            />
          </div>
          <div className="col-md-4">
            <Profile
              name="Louis Tomlinson"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              profesiion="Web Developer"
              image={userThrid}
            />
          </div>
        </dvi>
      </div>
    </div>
  );
}
