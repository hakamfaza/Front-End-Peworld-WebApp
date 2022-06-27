/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import Skills from '../../compoents/Card/skills';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiGithub, FiGitlab } from 'react-icons/fi';
import Experience from '../../compoents/Card/experience';

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const myId = context.req.cookies.id;
  const { isRecruiter } = context.req.cookies;

  const fetchApi = async () => {
    const { id } = context.params;
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        method: 'get',
        headers: {
          token
        }
      });
      return {
        data: response.data.data,
        error: false,
        token: token || null,
        isRecruiter
      };
    } catch (error) {
      return {
        data: [],
        error: true
      };
    }
  };

  const getMyUser = async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/${myId}`,
        method: 'get',
        headers: {
          token
        }
      });
      return {
        data: response.data.data,
        error: false,
        token: token || null
      };
    } catch (error) {
      return {
        data: [],
        error: true
      };
    }
  };

  return {
    props: {
      data: [],
      users: await fetchApi(),
      myUser: await getMyUser()
    }
  };
}

const profile = props => {
  const [getUser, setUser] = useState(props.users.data);
  const myUser = props.myUser.data.user;
  const token = props.users.token;
  const router = useRouter();

  const sendMessage = async () => {
    const body = {
      message: `Halo ${getUser.user.name}, saya ${myUser.name} dari company ${myUser.company} ingin mengundang kamu untuk bekerja di perusahaan kami. Silahkan hubungi no ${myUser.phone} atau email ke ${myUser.email}`
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/message/${getUser.user.id}`, body, {
        headers: {
          token
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const img = getUser.user.photo ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}` : '/profile.png';
  return (
    <div className={styles.container}>
      <Head>
        <title>Peworld | Profile</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={styles.divOne} />
      <div className="container">
        <div className={styles.boxProfile}>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.boxInfo}>
                <div>
                  <div className={styles.profile}>
                    <Image src={img} width={150} height={150} className={styles.profile} alt="profile" />
                  </div>
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.profession}>{getUser.user.job_desk}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={15} height={15} alt="location" />
                  <p className={styles.textLocation}>{getUser.user.address || 'none'}</p>
                </div>
                <p className={styles.job}>{getUser.user.workplace}</p>
                <p className={styles.description}>{getUser.user.description}</p>

                {props.users.isRecruiter === 'true' ? (
                  <button className={styles.btn} onClick={() => sendMessage()}>
                    Hire
                  </button>
                ) : (
                  <div style={{ 'margin-top': '-20px' }}></div>
                )}
                <h5 className={styles.titleSkill}>Skill</h5>
                <div className="row">
                  {getUser.skills.map((item, index) => (
                    <div className="col-sm-4 mt-2" key={index}>
                      <Skills skill={item.skill} />
                    </div>
                  ))}
                  <div className={styles.contactTop}>
                    <HiOutlineMail className={styles.icon} />
                    <p className={styles.textContact}>{getUser.user.email || 'lorem@gmail.com'}</p>
                  </div>
                  <div className={styles.contact}>
                    <AiOutlineInstagram className={styles.icon} />
                    <p className={styles.textContact}>{getUser.user.instagram || 'lorem@gmail.com'}</p>
                  </div>
                  <div className={styles.contact}>
                    <FiGithub className={styles.icon} />
                    <p className={styles.textContact}>lorem@gmail.com</p>
                  </div>
                  <div className={styles.contact}>
                    <FiGitlab className={styles.icon} />
                    <p className={styles.textContact}>lorem@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className={styles.boxPortfolio}>
                <div className="m-4">
                  <ul className="nav nav-tabs" id="myTab">
                    <li className="nav-item">
                      <a href="#home" data-bs-toggle="tab" className={styles.titleExp}>
                        Portfolio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#profile" data-bs-toggle="tab" className={styles.titleExp}>
                        Pengalaman kerja
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="home">
                      <div className="row">
                        {getUser.portfolio.map((item, index) => {
                          return (
                            <div className="col-md-4" key={index}>
                              <div className={styles.boxPorto}>
                                <Image
                                  src={`https://peworld.herokuapp.com/${item.photo}`}
                                  width={250}
                                  height={150}
                                  alt="profile"
                                />
                                <p className={styles.textPorto}>{item.title}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile">
                      <div className="row">
                        {getUser.experience.map((item, index) => {
                          const img = item.image ? `https://peworld.herokuapp.com/${item.photo}` : '/image/default.png';
                          return (
                            <div className="col-md-12" key={index}>
                              <Experience
                                image={img}
                                job={item.profession}
                                company={item.company}
                                date={`${item.start_date} - ${item.resign_date}`}
                                description={item.description}
                              />
                            </div>
                          );
                        })}
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
  );
};

profile.layouts = 'L1';
export default profile;
