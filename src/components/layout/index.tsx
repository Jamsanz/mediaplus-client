import { Footer } from '@components/footer'
import { Header } from '@components/header'
import Head from 'next/head'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout = ({children}:any): JSX.Element => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    AOS.refresh();
  }, []);
    return (
        <>
        <Head>
          <meta property="og:title" content="@Media+ Consultancy" />
          <meta property="og:description" content="Media Consultancy and Campaign outsource" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>
        </Head>
        <Header />
        {children}
        <Footer />
        </>
    )
}

export default Layout
