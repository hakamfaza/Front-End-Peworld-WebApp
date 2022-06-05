import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import Input from '../../compoents/Input';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      users: await fetchApi(),
      token,
      id
    }
  };
}

const edit = props => {
  console.log(props.data.user);
  const [getUser, setUser] = useState(props.users.data);
  const img = getUser.user.photo ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}` : '/profile.png';
  const router = useRouter();
  const [getForm, setForm] = useState({
    name: getUser.user.name,
    jobDesk: getUser.user.job_desk,
    address: getUser.user.address,
    workplace: getUser.user.workplace,
    description: getUser.user.description,
    instagram: getUser.user.instagram,
    linkedin: getUser.user.linkedin,
    email: getUser.user.email,
    phone: getUser.user.phone
  });
  const [photo, setPhoto] = useState('');

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value
    });
  };

  const onChangeImage = (e, field) => {
    setPhoto({
      photo: e.target.files
    });
  };

  const onClick = async e => {
    e.preventDefault();

    if (photo) {
      const changePhoto = new FormData();
      changePhoto.append('photo', photo.photo[0]);

      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/profile/${props.id}`, changePhoto, {
          headers: {
            token: props.token
          }
        })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Sucess update profile!',
            showConfirmButton: false,
            timer: 1800
          });
          router.push('/profile');
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${props.id}`, getForm, {
        headers: {
          token: props.token
        }
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Sucess update profile!',
          showConfirmButton: false,
          timer: 1800
        });
        router.push('/profile');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.divOne} />
      <div className="container">
        <div className={styles.boxProfile}>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.boxInfo}>
                <div>
                  <div className={styles.profile}>
                    <Image src={img} width={150} height={150} className={styles.profile} alt="profile" />
                    <label htmlFor="profile" className={styles.changeProfile}>
                      Change photo
                    </label>
                    <input id="profile" type="file" onChange={e => onChangeImage(e, 'photo')} hidden></input>
                  </div>
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.jobR}>{getUser.user.jobDesk}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={20} height={20} alt="location" />
                  <p className={styles.textLocation}>{getUser.user.address || 'none'}</p>
                </div>
              </div>
              <button className={styles.btnOne} onClick={e => onClick(e)}>
                Simpan
              </button>
              <button className={styles.btnTwo} onClick={() => router.push('/profile')}>
                Batal
              </button>
            </div>
            <div className="col-md-9">
              <div className={styles.boxExperience}>
                <h3 className={styles.titleData}>Data diri</h3>
                <hr />
                <Input
                  title="Nama perusahaan"
                  placeholder="Masukan nama perusahaan"
                  onChange={e => onChange(e, 'name')}
                  defaultValue={getUser.user.name}
                  type="input"
                />
                <Input
                  title="Bidang"
                  placeholder="Masukan job desk"
                  onChange={e => onChange(e, 'jobDesk')}
                  defaultValue={getUser.user.job_desk}
                />
                <Input
                  title="Masukan domisili"
                  placeholder="Masukan domisili"
                  onChange={e => onChange(e, 'address')}
                  defaultValue={getUser.user.address}
                />
                <label className={styles.label}>Deskripsi singkat</label>
                <textarea
                  className={styles.textArea}
                  placeholder="Deskripsikan pekerjaan anda"
                  onChange={e => onChange(e, 'description')}
                  defaultValue={getUser.user.description}
                />
                <Input
                  title="Email"
                  placeholder="Masukan email"
                  onChange={e => onChange(e, 'email')}
                  defaultValue={getUser.user.email}
                />
                <Input
                  title="Instagram"
                  placeholder="Masukan nama instagram"
                  onChange={e => onChange(e, 'instagram')}
                  defaultValue={getUser.user.instagram}
                />
                <Input
                  title="Nomor Telepon"
                  placeholder="Masukan nomor telepon"
                  onChange={e => onChange(e, 'phone')}
                  defaultValue={getUser.user.phone}
                />
                <Input
                  title="Linkedin"
                  placeholder="Masukan nama linkedin"
                  onChange={e => onChange(e, 'linkedin')}
                  defaultValue={getUser.user.linkedin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

edit.layouts = 'L1';
export default edit;
