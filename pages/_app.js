/* eslint-disable @next/next/no-sync-scripts */
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Layouts from '../layouts/layouts';
import LayoutsFo from '../layouts/layoutsFooter';
import Head from 'next/head';

const layouts = {
  L1: Layouts,
  L2: LayoutsFo
};

const NoLayout = ({ children }) => {
  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  const Layouts = layouts[Component.layouts] || NoLayout;
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </>
  );
}

export default MyApp;
