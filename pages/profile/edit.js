import React, { useState } from "react";
import {useRouter} from 'next/router'
import styles from '../../styles/Profile.module.css'
import Image from 'next/image'
import Input from '../../compoents/Input'
import axios from "axios";

export async function getServerSideProps(context) {
  const { token, id } = context.req.cookies
  const fetchApi = async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        method: "get",
        headers: {
          token
        }
      })
      return {
        data: response.data.data,
        error: false,
          token: token || null
      }
    } catch (error) {
      return {
        data: [],
        error: true
    }
    }
  }

  return {
    props: {
      data: [],
      users: await fetchApi(),
      token,
      id
    }
  }
}

const edit = (props) => {
  const [getUser, setUser] = useState(props.users.data)
  console.log(getUser.user)
  const img = getUser.user.photo ? `${process.env.NEXT_PUBLIC_API_URL}/${getUser.user.photo}` : '/profile.png'
  const router = useRouter();
  const [getForm, setForm] = useState({
    name: '',
    jobDesk: '',
    address: '',
    workplace: '',
    description: '',
    instagram: '',
    linkedin: '',
    photo: ''
  })

  const [getExperience, setExperience] = useState({
    position: '',
    company: '',
    resignDate: '',
    description: '',
    repositoy: '',
    photo: '',
  })
  const [photo, setPhoto] = useState('')

  const [getPortfolio, setPortfolio] = useState({
    title: '',
    photo: '',
    aplication: '',
  })

  const onChange = (e, field) => {
    setForm({
      ...getForm,
      [field]: e.target.value,
    })

    setExperience({
      ...getExperience,
      [field]: e.target.value
    })

    setPortfolio({
      ...getPortfolio,
      [field]: e.target.value
    })
  }

  const onChangeImage = (e, field) => {
    setPhoto({
      photo: e.target.files
  })
  }

  const onClick = (e) => {
    e.preventDefault()

    if (getForm.name || getForm.address || getForm.description || getForm.jobDesk || getForm.workplace || getForm.photo === '') {
      alert('Semua input harus di isi!')
    }

    const formData = new FormData();
    formData.append('photo', photo.photo[0])
    formData.append('name', getForm.name)
    formData.append('jobDesk', getForm.jobDesk)
    formData.append('address', getForm.address)
    formData.append('workplace', getForm.workplace)
    formData.append('description', getForm.description)


    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${props.id}`, formData, {
      headers: {
        token: props.token
      }
    }).then((res) => {
      console.log(res)
      router.push('/profile')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={styles.containerEdit} >
    <div className={styles.divOne} />
    <div className="container bg-info" >
      <div className={styles.boxProfile} >
        <div className="row">
          <div className="col-md-3">
            <div className={styles.boxInfo} >
              <div>
                  <div className={styles.profile}>
                    <Image src={img} width={150} height={150} className={styles.profile} />
                    <label htmlFor="profile" className={styles.changeProfile} >Change photo</label>
                    <input id="profile" type='file' onChange={(e) => onChangeImage(e, 'photo')} hidden >
                    </input>
              </div>
              </div>
                <h3 className={styles.name} >{getUser.user.name}</h3>
                <p className={styles.profession} >{getUser.user.position}</p>
              <div className={styles.location} >
                <Image src="/location.svg" width={20} height={20} />
                <p className={styles.textLocation} >{getUser.user.address || 'none'}</p>
              </div>
              <p className={styles.job} >{getUser.user.job_desk}</p>
            </div>
            <button className={styles.btnOne} onClick={(e) => onClick(e)} >Simpan</button>
            <button className={styles.btnTwo} >Batal</button>
          </div>
          <div className="col-md-9">
              <div className={styles.boxExperience}>
                <h3 className={styles.titleData}>Data diri</h3>
                <hr />
                <Input title='Nama lengkap' placeholder='Masukan nama lengkap' onChange={(e) => onChange(e, 'name')} defaultValue={getUser.user.name} type='input' />
                <Input title='Job desk' placeholder='Masukan job desk' onChange={(e) => onChange(e, 'jobDesk')} defaultValue={getUser.user.job_desk} />
                <Input title='Masukan domisili' placeholder='Masukan domisili' onChange={(e) => onChange(e, 'address')} defaultValue={getUser.user.address} />
                <Input title='Tempat kerja' placeholder='Masukan tempat kerja' onChange={(e) => onChange(e, 'workplace')} defaultValue={getUser.user.workplace} />
                <p className={styles.label} >Deskripsi singkat</p>
                <textarea className={styles.textArea} placeholder='Deskripsikan pekerjaan anda' onChange={(e) => onChange(e, 'description')} defaultValue={getUser.user.description} />
              </div>
              <div className={styles.boxSkill}>
                <h3>Skill</h3>
                <hr />
                <Input placeholder='Java' />
              </div>
              <div className={styles.boxSkill}>
                <h3 className={styles.titleData}>Pengalaman kerja</h3>
                <hr />
                <Input title='Posisi' placeholder='Masukan posisi pekerjaan' onChange={(e) => onChange(e, 'position')} />
                <div className="row" >
                  <div className="col-md-6" >
                  <Input title='Nama perusahaan' placeholder='Masukan nama perusahaan' onChange={(e) => onChange(e, 'company')} />
                  </div>
                  <div className="col-md-6" >
                  <Input title='Bulan/tahun' type='date' onChange={(e) => onChange(e, 'resignDate')} />
                  </div>
                </div>
                <p className={styles.label} >Deskripsi singkat</p>
                <textarea className={styles.textArea} placeholder='Deskripsikan pekerjaan anda' onChange={(e) => onChange(e, 'description')} />
              </div>
              <div className={styles.boxSkill}>
                <h3 className={styles.titleData} >Portofolio</h3>
                <hr />
                <Input title='Nama aplikasi' placeholder='Masukan nama aplikasi' onChange={(e) => onChange(e, 'title')} />
                <Input title='Link repository' placeholder='Masukan link repository' onChange={(e) => onChange(e, 'repository')} />
                <div className="row mt-2" >
                  <div className="col-md-3">
                    <input id='web' type='radio' name='app' value="Mobile App" />
                    <label htmlFor='web' className={styles.appLabel} >Aplikasi mobile</label>
                  </div>
                  <div className="col-md-3">
                  <input id="aplikasi" type='radio' name='app' value='Web App' />
                    <label htmlFor='aplikasi'  className={styles.appLabel} >Aplikasi web</label>
                  </div>
                </div>
                <Input type='file' placeholder='Masukan file' onChange={(e) => onChange(e, 'photo')} />
                <hr/>
                <button className={styles.btnAdd} >Tambah portfolio</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

edit.layouts = 'L1'
export default edit
