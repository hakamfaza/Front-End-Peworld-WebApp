/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {} from 'next-cookies';
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import Skills from '../../compoents/Card/skills';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiGithub, FiGitlab } from 'react-icons/fi';
import Experience from '../../compoents/Card/experience';
import Swal from 'sweetalert2';
import Portfolio from '../../compoents/Card/portfolio';

export async function getServerSideProps(context) {
  const { token, id } = context.req.cookies;
  const fetchApi = async () => {
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
      users: await fetchApi()
    }
  };
}

const Profile = props => {
  const router = useRouter();
  const [getUser, setUser] = useState(props.users.data);

  useEffect(() => {
    getUser;
  }, [getUser]);

  const onEdit = () => {
    router.push('/profile/edit');
  };

  const onDelete = e => {
    Swal.fire({
      title: 'Do you want to delete this Portfolio?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(async res => {
      if (res.isConfirmed) {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/${e}`, {
          headers: {
            token: props.users.token
          }
        });
        window.location.reload();
        Swal.fire('Success!', '', 'success');
      }
    });
  };

  const onDeleteExp = e => {
    Swal.fire({
      title: 'Do you want to delete this Experience?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(async res => {
      if (res.isConfirmed) {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/experience/${e}`, {
          headers: {
            token: props.users.token
          }
        });
        window.location.reload();
        Swal.fire('Success!', '', 'success');
      }
    });
  };

  const onLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(res => {
      if (res.isConfirmed) {
        document.cookie = `id=;`;
        document.cookie = `isRecruiter=;`;
        document.cookie = 'token=; expires=2000-10-16T19:22:35.000Z';
        router.push('/login');
        Swal.fire('Logout!', '', 'success');
      }
    });
  };

  const img = getUser.user.photo ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}` : '/profile.png';

  return (
    <div className={styles.container}>
      <div className={styles.divOne} />
      <div className="container">
        <div className={styles.boxProfile}>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.boxInfo}>
                <div className={styles.profile}>
                  <Image src={img} width={150} height={150} className={styles.profile} />
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.profession}>{getUser.user.job_desk}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={16} height={16} />
                  <p className={styles.textLocation}>{getUser.user.address || 'none'}</p>
                </div>
                <p className={styles.job}>{getUser.user.workplace}</p>
                <p className={styles.description}>{getUser.user.description}</p>
                <button className={styles.btn} onClick={() => onEdit()}>
                  Edit
                </button>
                <button className={styles.btnOutW} onClick={() => onLogout()}>
                  Logout
                </button>
                <h5 className={styles.titleSkill}>Skill</h5>
                <div className="row">
                  {getUser.skills.map((item, index) => (
                    <div className="col-4 mt-2" key={index}>
                      <Skills skill={item.skill} />
                    </div>
                  ))}
                </div>
                <div className={styles.boxContact}>
                  <div className={styles.contact}>
                    <HiOutlineMail className={styles.icon} />
                    <p className={styles.textContact}>{getUser.user.email || 'lorem@gmail.com'}</p>
                  </div>
                  <div className={styles.contact}>
                    <AiOutlineInstagram className={styles.icon} />
                    <p className={styles.textContact}>{getUser.user.instagram || 'lorem@ipsum'}</p>
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
                  <ul className="nav mb-3" id="myTab">
                    <li className="nav-item">
                      <a href="#home" className={styles.titleExp} data-bs-toggle="tab">
                        Portfolio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#profile" className={styles.titleExp} data-bs-toggle="tab">
                        Pengalaman kerja
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="home">
                      <div>
                        {getUser.portfolio.length >= 0 ? (
                          <div className="row">
                            {getUser.portfolio.map((item, index) => {
                              return (
                                <div className="col-md-4 mt-3" key={index}>
                                  <Portfolio image={item.photo} title={item.title} onClick={() => onDelete(item.id)} />
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile">
                      {getUser.experience.length >= 0 ? (
                        <div className="row">
                          {getUser.experience.map((item, index) => {
                            return (
                              <div className="col-md-12" key={index}>
                                <Experience
                                  image={item.photo}
                                  job={item.profession}
                                  company={item.company}
                                  date={`${item.start_date} - ${new Date(
                                    Date.parse(item.resign_date)
                                  ).toLocaleDateString()}`}
                                  description={item.description}
                                  onClick={() => onDeleteExp(item.id)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <h1>Data tidak ada</h1>
                        </div>
                      )}
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

Profile.layouts = 'L1';
export default Profile;
