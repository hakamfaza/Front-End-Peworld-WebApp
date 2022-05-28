import React, { useState } from 'react';
import Card from '../../compoents/Card';
import { useRouter } from 'next/router';
import styles from '../../styles/List.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import cookies from 'next-cookies';

export async function getStaticProps(context) {
  const search = 'sari';
  const response = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/?search=${search}&limit=5`,
    headers: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMWUyNWQ1LTZlNGMtNDE2My1iMmZlLTgxNTQyY2JjOTY1OCIsInJlY3J1aXRlciI6dHJ1ZSwiaWF0IjoxNjUzNzAxNjkyLCJleHAiOjE2NTM3ODgwOTJ9.rpnPtn0aaniYWiWouS39VeYYCJXOrZJRIfdrOs4CIfU',
    },
  });
  // console.log(response.data);
  return {
    props: {
      data: response.data.data,
    }, // will be passed to the page component as props
    revalidate: 10,
  };
}

const ListUser = (props) => {
  const router = useRouter();
  const [getData, setData] = useState(props.data);
  console.log(getData);
  const [getSearch, setSearch] = useState(router.query.search);
  console.log(getSearch);
  // const [pagination, setPagination] =useState(props.users.data.pagination);

  const getValueSearch = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/?search=${getSearch}`, {
        headers: {
          token: props.token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInput = (e, filed) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    router.push(`/home/recruiter/?search=${getSearch}`);
    return getValueSearch();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      router.push(`/home/recruiter/?search=${getSearch}`);
      return getValueSearch();
    }
  };

  const onProfile = (id) => {
    router.push(`/profile/${id}`);
  };

  return (
    <>
      <div>
        <h1 className={styles.top}>Top Jobs</h1>
      </div>
      <div className="container-fluid">
        <div className={styles.container}>
          <div className={styles.boxSearch}>
            <input
              placeholder="Search user"
              className={styles.input}
              onChange={(e) => getInput(e)}
              onKeyDown={handleKey}
            />
            <AiOutlineSearch className={styles.iconSearch} />
            <div className={styles.category}>Kategori</div>
            <button className={styles.btn} onClick={(e) => onSearch(e)}>
              Seach
            </button>
          </div>
          {getData.map((item, index) => {
            const img = item.user.photo
              ? `https://peworld.herokuapp.com/${item.photo}`
              : '/profile.png';
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
              <li className="page-item"></li>
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
