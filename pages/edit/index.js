import React from "react";
import styles from '../../styles/Profile.module.css'
import Image from 'next/image'
import Input from '../../compoents/Input'

const edit = () => {
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
            </div>
            <button className={styles.btnOne} >Simpan</button>
            <button className={styles.btnTwo} >Batal</button>
          </div>
          <div className="col-md-9">
              <div className={styles.boxExperience}>
                <h3 className={styles.titleData}>Data diri</h3>
                <hr />
                <Input title='Nama lengkap' placeholder='Masukan nama lengkap' />
                <Input title='Job desk' placeholder='Masukan job desk' />
                <Input title='Masukan domisili' placeholder='Masukan domisili' />
                <Input title='Tempat kerja' placeholder='Masukan tempat kerja' />
                <p className={styles.label} >Deskripsi singkat</p>
                <textarea className={styles.textArea} placeholder='Deskripsikan pekerjaan anda' />
              </div>
              <div className={styles.boxSkill}>
                <h3>Skill</h3>
                <hr />
                <Input placeholder='Java' />
              </div>
              <div className={styles.boxSkill}>
                <h3 className={styles.titleData}>Pengalaman kerja</h3>
                <hr />
                <Input title='Posisi' placeholder='Masukan posisi pekerjaan' />
                <div className="row" >
                  <div className="col-md-6" >
                  <Input title='Nama perusahaan' placeholder='Masukan nama perusahaan' />
                  </div>
                  <div className="col-md-6" >
                  <Input title='Bulan/tahun' type='date' />
                  </div>
                </div>
                <p className={styles.label} >Deskripsi singkat</p>
                <textarea className={styles.textArea} placeholder='Deskripsikan pekerjaan anda' />
              </div>
              <div className={styles.boxSkill}>
                <h3 className={styles.titleData} >Portofolio</h3>
                <hr />
                <Input title='Nama aplikasi' placeholder='Masukan nama aplikasi' />
                <Input title='Link repository' placeholder='Masukan link repository' />
                <div className="row mt-2" >
                  <div className="col-md-3">
                    <input id='web' type='radio' name='app' />
                    <label htmlFor='web' className={styles.appLabel} >Aplikasi mobile</label>
                  </div>
                  <div className="col-md-3">
                  <input id="aplikasi" type='radio' name='app'/>
                    <label htmlFor='aplikasi'  className={styles.appLabel} >Aplikasi web</label>
                  </div>
                </div>
                <Input type='file' placeholder='Masukan file' />
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
