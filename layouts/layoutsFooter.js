import React from 'react';
import Footer from '../compoents/Footer';

export default function Layouts({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
