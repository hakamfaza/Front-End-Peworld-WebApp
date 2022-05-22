import React from "react";
import Navbar from '../compoents/Navbar'
import Footer from '../compoents/Footer'

export default function Layouts({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
