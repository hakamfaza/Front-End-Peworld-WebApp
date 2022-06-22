import React, { useState } from 'react';
import Card from '../../compoents/Card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/List.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const fetchApi = async () => {
    const search = context.query.search || '';
    const sortField = context.query.sortField || '';
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/?search=${search}&&sortField=${sortField}&limit=5`,
        method: 'get',
        headers: {
          token
        }
      });
      return {
        data: response.data.data,
        error: false,
        token: token
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
      token: token || null
    }
  };
}

const ListUser = props => {
  const router = useRouter();
  const [getData, setData] = useState(props.users.data);
  const [getSearch, setSearch] = useState(router.query.search || '');
  const [isCategory, setIsCategory] = useState(false);
  const [getCategory, setCategory] = useState('');

  const getValueSearch = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/?search=${getSearch}&sortField=${getCategory}`, {
        headers: {
          token: props.token
        }
      })
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getInput = (e, filed) => {
    setSearch(e.target.value);
  };

  const onCategory = e => {
    if (isCategory) {
      setIsCategory(false);
    } else {
      setIsCategory(true);
    }
    setCategory(e);
  };

  const onSearch = e => {
    e.preventDefault();
    router.push(`/home/?search=${getSearch}&sortField=${getCategory}`);
    return getValueSearch();
  };

  const handleKey = e => {
    if (e.key === 'Enter') {
      router.push(`/home/?search=${getSearch}&sortField=${getCategory}`);
      return getValueSearch();
    }
  };

  const onProfile = id => {
    router.push(`profile/${id}`);
  };

  return (
    <>
      <Head>
        <title>Peworld | Home</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <h1 className={styles.top}>Top Jobs</h1>
      </div>
      <div className="container-fluid">
        <div className={styles.container}>
          <div className={styles.boxSearch}>
            <input
              placeholder="Search user"
              className={styles.input}
              onChange={e => getInput(e)}
              onKeyDown={handleKey}
            />
            <AiOutlineSearch className={styles.iconSearch} />
            <div className={styles.category}>
              <button onClick={() => onCategory('')} className={styles.category}>
                Kategori
              </button>
              {isCategory ? (
                <div className={styles.dropDown}>
                  <button onClick={() => onCategory('Name')} className={styles.btnDropDown}>
                    Name
                  </button>
                  <button onClick={() => onCategory('Address')} className={styles.btnDropDownTwo}>
                    Address
                  </button>
                </div>
              ) : null}
            </div>
            <button className={styles.btn} onClick={e => onSearch(e)}>
              Seach
            </button>
          </div>
          {getData.map((item, index) => {
            const img = item.user.photo ? `${process.env.NEXT_PUBLIC_API_URL}/${item.photo}` : '/profile.png';
            return (
              <div key={index}>
                <Card
                  image={`${img}`}
                  address={item.user.address || 'none'}
                  name={item.user.name}
                  onClick={() => onProfile(`${item.user.id}`)}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
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
  );
};

ListUser.layouts = 'L1';
export default ListUser;
