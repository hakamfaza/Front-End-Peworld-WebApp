import React from "react";
import styles from '../../styles/Profile.module.css'
import Image from 'next/image'
import Skills from "../../compoents/Card/skills";
import {HiOutlineMail} from 'react-icons/hi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FiGithub, FiGitlab} from 'react-icons/fi'

const Profile = () => {
  return (
    <div className={styles.container} >
      <div className={styles.divOne} />
      <div className="container bg-info" >
        <div className={styles.boxProfile} >
          <div className="row">
            <div className="col-md-3">
              <div className={styles.boxInfo} >
                <div>
                <div className={styles.profile}>
                    <Image src="/nial.jpg" width={150} height={150} className={styles.profile} />
                </div>
                </div>
                <h3 className={styles.name} >Louis Tomlinson</h3>
                <p className={styles.profession} >Web Developer</p>
                <div className={styles.location} >
                  <Image src="/location.svg" width={20} height={20} />
                  <p className={styles.textLocation} >Purwekerto Jawa Tengah</p>
                </div>
                <p className={styles.job} >Freelencer</p>
                <p className={styles.description} >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu lacus fringilla, vestibulum risus at.
                </p>
                <button className={styles.btn} >Hire</button>
                <h5 className={styles.titleSkill} >Skill</h5>
                <div className="row" >
                  <div className="col-sm-4 mt-2" >
                  <Skills skill="Javascript" />
                  </div>
                  <div className="col-sm-4 mt-2" >
                  <Skills skill="PHP" />
                  </div>
                  <div className="col-sm-4 mt-2" >
                  <Skills skill="Golang" />
                  </div>
                  <div className="col-sm-4 mt-2" >
                  <Skills skill="Golang" />
                  </div>
                  <div className="col-sm-4 mt-2" >
                  <Skills skill="Phyton" />
                  </div>
                  <div className={styles.contactTop} >
                    <HiOutlineMail className={styles.icon} />
                    <p className={styles.textContact} >lorem@gmail.com</p>
                  </div>
                  <div className={styles.contact} >
                    <AiOutlineInstagram className={styles.icon} />
                    <p className={styles.textContact} >lorem@gmail.com</p>
                  </div>
                  <div className={styles.contact} >
                    <FiGithub className={styles.icon} />
                    <p className={styles.textContact} >lorem@gmail.com</p>
                  </div>
                    <div className={styles.contact} >
                    <FiGitlab className={styles.icon} />
                    <p className={styles.textContact} >lorem@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className={styles.boxPortfolio}>
                <ul className="nav">
                  <li >
                    <a className={styles.titleAction} href="#">Portfolio</a>
                  </li>
                  <li className="nav-item">
                    <a className={styles.titleAction} href="#">Pengalaman kerja</a>
                  </li>
                </ul>
                <div className={styles.containerPorto} >
                  <div className="row">
                    <div className="col-md-4" >
                      <div className={styles.boxPorto} >
                        <Image src="/porto.jpg" width={250} height={150} />
                        <p className={styles.textPorto} >Remainder app</p>
                      </div>
                    </div>
                    <div className="col-md-4" >
                      <div className={styles.boxPorto} >
                        <Image src="/porto.jpg" width={250} height={150} />
                        <p className={styles.textPorto} >Remainder app</p>
                      </div>
                    </div>
                    <div className="col-md-4" >
                      <div className={styles.boxPorto} >
                        <Image src="/porto.jpg" width={250} height={150} />
                        <p className={styles.textPorto} >Remainder app</p>
                      </div>
                    </div>
                    <div className="col-md-4" >
                      <div className={styles.boxPorto} >
                        <Image src="/porto.jpg" width={250} height={150} />
                        <p className={styles.textPorto} >Remainder app</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

Profile.layouts = 'L1'
export default Profile
