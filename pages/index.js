import Head from 'next/head';
import Image from 'next/image';
import Jumbotron from '../compoents/Jumbotron';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Jumbotron />
    </div>
  );
};

Home.layouts = 'L2';
export default Home;
