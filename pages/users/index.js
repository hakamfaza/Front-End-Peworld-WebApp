import React, {useState} from "react";
import Card from "../../compoents/Card";
import {useRouter} from 'next/router'
import styles from '../../styles/List.module.css'
import {AiOutlineSearch} from 'react-icons/ai'
import axios from "axios";

export async function getServerSideProps(context) {
  const { token} = context.req.cookies
  const fetchApi = async () => {
    const search = context.query.search || ''
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/?search=${search}&limit=5`,
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
    }
  }
}

const ListUser = (props) => {
  const router = useRouter()
  const [getData, setData] = useState(props.users.data)
  const [getSearch, setSearch] = useState(router.query.search)

  const getInput = (e, filed) => {
    setSearch(e.target.value)
  }

  const onSearch = (e) => {
    e.preventDefault()
    router.push(`/users/?search=${getSearch}`)
  }

  const onProfile = (id) => {
    router.push(`profile/${id}`)
  }

  return (
    <>
      <div>
        <h1 className={styles.top} >
          Top Jobs
        </h1>
      </div>
    <div className="container-fluid">
      <div className={styles.container} >
        <div className={styles.boxSearch}>
          <input placeholder="Search user" className={styles.input} onChange={(e) => getInput(e)} />
          <AiOutlineSearch className={styles.iconSearch} />
          <div className={styles.category} >Kategori</div>
          <button className={styles.btn} onClick={(e) => onSearch(e)} >Seach</button>
          </div>
          {
            getData.map((item, index) => {
              const img = item.photo ? `https://peworld.herokuapp.com/${item.photo}` : '/profile.png'
              return (
                <div key={index} >
                  <Card image={`${img}`} address={item.address} name={item.name} onClick={() => onProfile(`${item.id}`)} />
                </div>
              )
            })
          }
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


ListUser.layouts = 'L1'
export default ListUser
