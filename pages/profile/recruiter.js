import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import Skills from '../../compoents/Card/skills';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiLinkedin } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import Experience from '../../compoents/Card/experience';

export async function getServerSideProps(context) {
  const { token, id } = context.req.cookies;
  const fetchApi = async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        method: 'get',
        headers: {
          token,
        },
      });
      console.log(response.url);
      return {
        data: response.data.data,
        error: false,
        token: token || null,
      };
    } catch (error) {
      return {
        data: [],
        error: true,
      };
    }
  };

  return {
    props: {
      data: [],
      users: await fetchApi(),
    },
  };
}

const Profile = (props) => {
  const router = useRouter();
  const [getUser, setUser] = useState(props.users.data);

  const onEdit = () => {
    router.push('/profile/editrecruiter');
  };

  const img = getUser.user.photo
    ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}`
    : '/profile.png';
  return (
    <div className={styles.containerR}>
      <div className="container">
        <div className={styles.boxProfile}>
          <div className="row">
            <div className="col-md-12">
              <div className={styles.boxInfoR}>
                <div className={styles.divOneR} />
                <div>
                  <div className={styles.profileR}>
                    <Image
                      src={img}
                      width={150}
                      height={150}
                      className={styles.profileR}
                    />
                  </div>
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.profession}>{getUser.user.job_desk}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={16} height={16} />
                  <p className={styles.textLocation}>{getUser.user.address}</p>
                </div>
                <p className={styles.descriptionR}>
                  {getUser.user.description}
                </p>
                <button className={styles.btnR} onClick={() => onEdit()}>
                  Edit profile
                </button>
                <div className={styles.boxContact}>
                  <div className={styles.contact}>
                    <HiOutlineMail className={styles.icon} />
                    <p className={styles.textContact}>
                      {getUser.user.email || 'lorem@gmail.com'}
                    </p>
                  </div>
                  <div className={styles.contact}>
                    <AiOutlineInstagram className={styles.icon} />
                    <p className={styles.textContact}>
                      {getUser.user.instagram || 'lorem@ipsum'}
                    </p>
                  </div>
                  <div className={styles.contact}>
                    <BsTelephone className={styles.icon} />
                    <p className={styles.textContact}>
                      {getUser.user.phone || '08xx-xxx-xxx'}
                    </p>
                  </div>
                  <div className={styles.contact}>
                    <FiLinkedin className={styles.icon} />
                    <p className={styles.textContact}>
                      {getUser.user.linkedin || 'lorem@ipsum'}
                    </p>
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
