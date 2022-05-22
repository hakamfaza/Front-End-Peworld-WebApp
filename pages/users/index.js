import React from "react";
import Card from "../../compoents/Card";
import styles from '../../styles/List.module.css'
import {AiOutlineSearch} from 'react-icons/ai'
import Navbar from "../../compoents/Navbar";

export default function listUser() {
  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div className={styles.container} >
        <div className={styles.boxSearch}>
          <input placeholder="Search user" className={styles.input} />
          <AiOutlineSearch className={styles.iconSearch} />
          <div className={styles.category} >Kategori</div>
          <button className={styles.btn} >Seach</button>
        </div>
        <Card image='/nial.jpg' profession='Web Dev'   address='Lorem ipsum' name='Nial Sans' />
        <Card image='/nial.jpg' profession='Web Dev' address='Lorem ipsum' name='Nial Sans' />
        <Card image='/nial.jpg' profession='Web Dev' address='Lorem ipsum' name='Nial Sans' />
      </div>
      <div className={styles.pagination} >
      <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      </nav>
      </div>
      </div>
      </>
  )
}
