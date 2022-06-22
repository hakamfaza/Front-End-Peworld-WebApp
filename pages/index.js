import Head from 'next/head';
import Image from 'next/image';
import Jumbotron from '../compoents/Jumbotron';
import Last from '../compoents/Layouts/last';
import Main from '../compoents/Layouts/main';
import Second from '../compoents/Layouts/second';
import Thrid from '../compoents/Layouts/thrid';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Peworld</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Jumbotron />
      <Main />
      <Second />
      <Thrid />
      <Last />
    </div>
  );
};

Home.layouts = 'L1';
export default Home;
