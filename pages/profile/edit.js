/* eslint-disable react-hooks/rules-of-hooks */
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

  const [getValueSkill, setValueSkill] = useState([]);

  const [getExperience, setExperience] = useState({
    profession: '',
    company: '',
    resignDate: '',
    description: '',
    photo: ''
  });

  const [getPortfolio, setPortfolio] = useState({
    title: '',
    photo: '',
    aplication: '',
    repository: ''
  });

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value
    });
  };

  const onChangeExp = (e, field) => {
    setExperience({
      ...getExperience,
      [field]: e.target.value
    });
  };

  const onChangePorto = (e, field) => {
    setPortfolio({
      ...getPortfolio,
      [field]: e.target.value
    });
  };

  console.log(getPortfolio);

  const onChangeImage = (e, field) => {
    setPhoto({
      photo: e.target.files
    });
  };

  const [getValueCard, setValueCard] = useState([]);

  const addCard = () => {
    getValueCard.push(
      <div className={styles.boxCard}>
        <h3 className={styles.titleData}>Pengalaman kerja</h3>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <Input
              title="Nama perusahaan"
              placeholder="Masukan nama perusahaan"
              onChange={e => onChangeExp(e, 'company')}
            />
          </div>
          <div className="col-md-6">
            <Input title="Bulan/tahun" type="date" onChange={e => onChangeExp(e, 'resignDate')} />
          </div>
          <div className="col-md-12">
            <Input
              title="Profession"
              placeholder="Masukan professi"
              type="input"
              onChange={e => onChangeExp(e, 'profession')}
            />
          </div>
          <div className="col-md-12">
            <Input
              id="experience"
              type="text"
              title="Photo"
              placeholder="Masukan link photo"
              onChange={e => onChangeExp(e, 'photo')}
            />
          </div>
        </div>
        <p className={styles.label}>Deskripsi singkat</p>
        <textarea
          className={styles.textArea}
          placeholder="Deskripsikan pekerjaan anda"
          onChange={e => onChangeExp(e, 'description')}
        />
        <hr />
        <button className={styles.btnAdd} onClick={addCard}>
          Tambah pengalaman kerja
        </button>
      </div>
    );
    setValueCard([...getValueCard]);
  };

  const [getValuePortofolio, setValuePortofolio] = useState([]);

  const addCardPortofolio = () => {
    getValuePortofolio.push(
      <div className={styles.boxCard} key={getValuePortofolio.length}>
        <h3 className={styles.titleData}>Portofolio</h3>
        <hr />
        <Input title="Nama aplikasi" placeholder="Masukan nama aplikasi" onChange={e => onChangePorto(e, 'title')} />
        <Input
          title="Link repository"
          placeholder="Masukan link repository"
          onChange={e => onChangePorto(e, 'repository')}
        />
        <div className="row mt-2">
          <div className="col-md-3">
            <input id="web" type="radio" name="app" value="Mobile App" onChange={e => onChangePorto(e, 'aplication')} />
            <label htmlFor="web" className={styles.appLabel}>
              Aplikasi mobile
            </label>
          </div>
          <div className="col-md-3">
            <input
              id="aplikasi"
              type="radio"
              name="app"
              value="Web App"
              onChange={e => onChangePorto(e, 'aplication')}
            />
            <label htmlFor="aplikasi" className={styles.appLabel}>
              Aplikasi web
            </label>
          </div>
        </div>
        <Input type="text" title="Photo" placeholder="Masukan link photo" onChange={e => onChangePorto(e, 'photo')} />
        <hr />
        <button className={styles.btnAdd}>Tambah portfolio</button>
      </div>
    );
    setValuePortofolio([...getValuePortofolio]);
  };

  const option = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'PHP', label: 'PHP' },
    { value: 'ReactJs', label: 'ReactJs' },
    { value: 'ExpressJs', label: 'ExpressJs' },
    { value: 'NodeJs', label: 'NodeJs' }
  ];

  const getSkill = getUser.skills.map(item => {
    return { value: item.skill, label: item.skill };
  });

  const onSkill = e => {
    const skill = e.map(item => {
      return item.value;
    });
    setValueSkill(skill);
  };

  const onClick = async e => {
    e.preventDefault();
    const body = {
      skill: getValueSkill
    };

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
          Swal.fire({
            icon: 'error',
            title: 'Failed update profile!',
            showConfirmButton: false,
            timer: 1800
          });
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
        res;
        router.push('/profile');
      })
      .catch(err => {
        console.log(err);
      });

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/skills`, body, {
        headers: {
          token: props.token
        }
      })
      .then(res => {
        res;
      })
      .catch(err => {
        console.log(err);
      });

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/experience`, getExperience, {
        headers: {
          token: props.token
        }
      })
      .then(res => {
        res;
      })
      .catch(err => {
        console.log(err);
      });

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, getPortfolio, {
        headers: {
          token: props.token
        }
      })
      .then(res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Sucess update profile!',
          showConfirmButton: false,
          timer: 1800
        });
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
                <div className={styles.profile}>
                  <Image src={img} width={150} height={150} className={styles.profile} alt="profile" />
                  <label htmlFor="profile" className={styles.changeProfile}>
                    Change photo
                  </label>
                  <input id="profile" type="file" onChange={e => onChangeImage(e, 'photo')} hidden></input>
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.profession}>{getUser.user.position}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={20} height={20} alt="location" />
                  <p className={styles.textLocation}>{getUser.user.address || 'none'}</p>
                </div>
                <p className={styles.job}>{getUser.user.job_desk}</p>
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
                  title="Nama lengkap"
                  placeholder="Masukan nama lengkap"
                  onChange={e => onChange(e, 'name')}
                  defaultValue={getUser.user.name}
                  type="input"
                />
                <Input
                  title="Job desk"
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
                <Input
                  title="Tempat kerja"
                  placeholder="Masukan tempat kerja"
                  onChange={e => onChange(e, 'workplace')}
                  defaultValue={getUser.user.workplace}
                />
                <Input
                  title="Instagram"
                  placeholder="Masukan nama instagram"
                  onChange={e => onChange(e, 'instagram')}
                  defaultValue={getUser.user.instagram}
                />
                <Input
                  title="Linkedin"
                  placeholder="Masukan nama linkedin"
                  onChange={e => onChange(e, 'linkedin')}
                  defaultValue={getUser.user.linkedin}
                />
                <label className={styles.label}>Deskripsi singkat</label>
                <textarea
                  className={styles.textArea}
                  placeholder="Deskripsikan pekerjaan anda"
                  onChange={e => onChange(e, 'description')}
                  defaultValue={getUser.user.description}
                />
              </div>
              <div className={styles.boxCard}>
                <h3 className={styles.titleSkill}>Skill</h3>
                <hr />
                <Select
                  isMulti
                  name="skill"
                  options={option}
                  onChange={e => onSkill(e, 'value')}
                  defaultValue={getSkill}
                />
              </div>
              <div className={styles.boxCard}>
                <h3 className={styles.titleData}>Pengalaman kerja</h3>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      title="Nama perusahaan"
                      placeholder="Masukan nama perusahaan"
                      onChange={e => onChangeExp(e, 'company')}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input title="Bulan/tahun" type="date" onChange={e => onChangeExp(e, 'resignDate')} />
                  </div>
                  <div className="col-md-12">
                    <Input
                      title="Profession"
                      placeholder="Masukan professi"
                      type="input"
                      onChange={e => onChangeExp(e, 'profession')}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input
                      id="experience"
                      type="text"
                      title="Photo"
                      placeholder="Masukan link photo"
                      onChange={e => onChangeExp(e, 'photo')}
                    />
                  </div>
                </div>
                <p className={styles.label}>Deskripsi singkat</p>
                <textarea
                  className={styles.textArea}
                  placeholder="Deskripsikan pekerjaan anda"
                  onChange={e => onChangeExp(e, 'description')}
                />
                <hr />
                <button className={styles.btnAdd} onClick={addCard}>
                  Tambah pengalaman kerja
                </button>
              </div>
              {getValueCard}
              <div className={styles.boxCard}>
                <h3 className={styles.titleData}>Portofolio</h3>
                <hr />
                <Input
                  title="Nama aplikasi"
                  placeholder="Masukan nama aplikasi"
                  onChange={e => onChangePorto(e, 'title')}
                />
                <Input
                  title="Link repository"
                  placeholder="Masukan link repository"
                  onChange={e => onChangePorto(e, 'repository')}
                />
                <div className="row mt-2">
                  <div className="col-md-3">
                    <input
                      id="web"
                      type="radio"
                      name="app"
                      value="Mobile App"
                      onChange={e => onChangePorto(e, 'aplication')}
                    />
                    <label htmlFor="web" className={styles.appLabel}>
                      Aplikasi mobile
                    </label>
                  </div>
                  <div className="col-md-3">
                    <input
                      id="aplikasi"
                      type="radio"
                      name="app"
                      value="Web App"
                      onChange={e => onChangePorto(e, 'aplication')}
                    />
                    <label htmlFor="aplikasi" className={styles.appLabel}>
                      Aplikasi web
                    </label>
                  </div>
                </div>
                <Input
                  type="text"
                  title="Photo"
                  placeholder="Masukan link photo"
                  onChange={e => onChangePorto(e, 'photo')}
                />
                <hr />
                <button className={styles.btnAdd} onClick={addCardPortofolio}>
                  Tambah portfolio
                </button>
              </div>
              {getValuePortofolio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

edit.layouts = 'L1';
export default edit;
