import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import styles from '../../styles/Profile.module.css';
import Image from 'next/image';
import Input from '../../compoents/Input';
import axios from 'axios';

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
      token,
      id,
    },
  };
}

const edit = (props) => {
  const [getUser, setUser] = useState(props.users.data);
  const img = getUser.user.photo
    ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}`
    : '/profile.png';
  const router = useRouter();
  const [getForm, setForm] = useState({
    name: getUser.user.name,
    jobDesk: getUser.user.job_desk,
    address: getUser.user.address,
    workplace: getUser.user.workplace,
    description: getUser.user.description,
    instagram: getUser.user.instagram,
    linkedin: getUser.user.linkedin,
  });
  const [photo, setPhoto] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}`
  );

  const [getValueSkill, setValueSkill] = useState([]);

  const [getPhotoExperience, setPhotoExperience] = useState('');
  const [getExperience, setExperience] = useState({
    profession: '',
    company: '',
    resignDate: '',
    descriptionExp: '',
  });

  const [getPortfolio, setPortfolio] = useState({
    title: '',
    photo: '',
    aplication: '',
    repository: '',
  });
  const [getPhotoPorto, setPhotoPorto] = useState('');

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value,
    });

    setExperience({
      ...getExperience,
      [field]: e.target.value,
    });

    setPortfolio({
      ...getPortfolio,
      [field]: e.target.value,
    });
  };

  const onChangeImage = (e, field) => {
    setPhoto({
      photo: e.target.files,
    });
  };

  const addPhotoExp = (e, field) => {
    setPhotoExperience({
      photo: e.target.files,
    });
  };

  const onPhotoPorto = (e, field) => {
    setPhotoPorto({
      photo: e.target.files,
    });
  };

  const [getValuCard, setValueCard] = useState([]);

  const addCard = () => {
    getValuCard.push(
      <div className={styles.boxCard} key={getValuCard.length}>
        <h3 className={styles.titleData}>Pengalaman kerja</h3>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <Input
              title="Nama perusahaan"
              placeholder="Masukan nama perusahaan"
              onChange={(e) => onChange(e, 'company')}
            />
          </div>
          <div className="col-md-6">
            <Input
              title="Bulan/tahun"
              type="date"
              onChange={(e) => onChange(e, 'resignDate')}
            />
          </div>
          <div className="col-md-12">
            <Input
              title="Profession"
              placeholder="Masukan professi"
              type="input"
              onChange={(e) => onChange(e, 'profession')}
            />
          </div>
          <div className="col-md-12">
            <Input
              id="experience"
              type="file"
              onChange={(e) => addPhotoExp(e, 'photo')}
              hidden
            />
          </div>
        </div>
        <p className={styles.label}>Deskripsi singkat</p>
        <textarea
          className={styles.textArea}
          placeholder="Deskripsikan pekerjaan anda"
          onChange={(e) => onChange(e, 'descriptionExp')}
        />
        <hr />
        <button className={styles.btnAdd} onClick={addCard}>
          Tambah pengalaman kerja
        </button>
      </div>
    );
    setValueCard([...getValuCard]);
  };

  const [getValuePortofolio, setValuePortofolio] = useState([]);

  const addCardPortofolio = () => {
    getValuePortofolio.push(
      <div className={styles.boxCard} key={getValuePortofolio.length}>
        <h3 className={styles.titleData}>Portofolio</h3>
        <hr />
        <Input
          title="Nama aplikasi"
          placeholder="Masukan nama aplikasi"
          onChange={(e) => onChange(e, 'title')}
        />
        <Input
          title="Link repository"
          placeholder="Masukan link repository"
          onChange={(e) => onChange(e, 'repository')}
        />
        <div className="row mt-2">
          <div className="col-md-3">
            <input
              id="web"
              type="radio"
              name="app"
              value="Mobile App"
              onChange={(e) => onChange(e, 'aplication')}
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
              onChange={(e) => onChange(e, 'aplication')}
            />
            <label htmlFor="aplikasi" className={styles.appLabel}>
              Aplikasi web
            </label>
          </div>
        </div>
        <Input
          type="file"
          placeholder="Masukan file"
          onChange={(e) => onPhotoPorto(e, 'photo')}
        />
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
    { value: 'NodeJs', label: 'NodeJs' },
  ];

  const getSkill = getUser.skills.map((item) => {
    return { value: item.skill, label: item.skill };
  });

  const onSkill = (e) => {
    const skill = e.map((item) => {
      return item.value;
    });
    setValueSkill(skill);
  };

  const onClick = async (e) => {
    e.preventDefault();
    const body = {
      skill: getValueSkill,
    };

    const changePhoto = new FormData();
    changePhoto.append('photo', photo.photo[0]);

    const formData = new FormData();
    formData.append('name', getForm.name);
    formData.append('jobDesk', getForm.jobDesk);
    formData.append('address', getForm.address);
    formData.append('workplace', getForm.workplace);
    formData.append('instagram', getForm.instagram);
    formData.append('linkedin', getForm.linkedin);
    formData.append('description', getForm.description);

    // const expData = new FormData();
    // expData.append('photo', getPhotoExperience.photo[0]);
    // expData.append('company', getExperience.company);
    // expData.append('resignDate', getExperience.resignDate);
    // expData.append('profession', getExperience.profession);
    // expData.append('description', getExperience.descriptionExp);

    // const portoData = new FormData();
    // portoData.append('photo', getPhotoPorto.photo[0]);
    // portoData.append('aplication', getPortfolio.aplication);
    // portoData.append('repository', getPortfolio.repository);
    // portoData.append('title', getPortfolio.title);

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${props.id}`,
        changePhoto,
        {
          headers: {
            token: props.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push('/profile');
      })
      .catch((err) => {
        console.log(err);
      });

    // await axios
    //   .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${props.id}`, formData, {
    //     headers: {
    //       token: props.token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     router.push('/profile');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/skills`, body, {
    //     headers: {
    //       token: props.token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/experience`, expData, {
    //     headers: {
    //       token: props.token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, portoData, {
    //     headers: {
    //       token: props.token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
                    <Image
                      src={img}
                      width={150}
                      height={150}
                      className={styles.profile}
                    />
                    <label htmlFor="profile" className={styles.changeProfile}>
                      Change photo
                    </label>
                    <input
                      id="profile"
                      type="file"
                      onChange={(e) => onChangeImage(e, 'photo')}
                      hidden
                    ></input>
                  </div>
                </div>
                <h3 className={styles.name}>{getUser.user.name}</h3>
                <p className={styles.jobR}>{getUser.user.job_desk}</p>
                <div className={styles.location}>
                  <Image src="/location.svg" width={20} height={20} />
                  <p className={styles.textLocation}>
                    {getUser.user.address || 'none'}
                  </p>
                </div>
              </div>
              <button className={styles.btnOne} onClick={(e) => onClick(e)}>
                Simpan
              </button>
              <button
                className={styles.btnTwo}
                onClick={() => router.push('/profile')}
              >
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
                  onChange={(e) => onChange(e, 'name')}
                  defaultValue={getUser.user.name}
                  type="input"
                />
                <Input
                  title="Bidang"
                  placeholder="Masukan job desk"
                  onChange={(e) => onChange(e, 'jobDesk')}
                  defaultValue={getUser.user.job_desk}
                />
                <Input
                  title="Masukan domisili"
                  placeholder="Masukan domisili"
                  onChange={(e) => onChange(e, 'address')}
                  defaultValue={getUser.user.address}
                />
                <label className={styles.label}>Deskripsi singkat</label>
                <textarea
                  className={styles.textArea}
                  placeholder="Deskripsikan pekerjaan anda"
                  onChange={(e) => onChange(e, 'description')}
                  defaultValue={getUser.user.description}
                />
                <Input
                  title="Email"
                  placeholder="Masukan email"
                  onChange={(e) => onChange(e, 'workplace')}
                  defaultValue={getUser.user.email}
                />
                <Input
                  title="Instagram"
                  placeholder="Masukan nama instagram"
                  onChange={(e) => onChange(e, 'instagram')}
                  defaultValue={getUser.user.instagram}
                />
                <Input
                  title="Nomor Telepon"
                  placeholder="Masukan nomor telepon"
                  onChange={(e) => onChange(e, 'phone')}
                  defaultValue={getUser.user.phone}
                />
                <Input
                  title="Linkedin"
                  placeholder="Masukan nama linkedin"
                  onChange={(e) => onChange(e, 'linkedin')}
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
