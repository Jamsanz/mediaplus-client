import { Footer } from '@components/footer'
import { Header } from '@components/header'
import Head from 'next/head'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout = ({ children }: any): JSX.Element => {
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
        <meta property="title" content="@Media+ Consultancy | Media consultants" />
        <meta property="description" content="Media Consultancy and Campaign outsource" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Neoistone is a reliable, fast and robust platform for all the needs of Hosting and Domain name development tools is so easy to use that litespeed it makes fast site" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="@Media+ Consultancy | Media consultants" />
        <meta property="og:description" content="Media Consultancy and Campaign outsource" />
        <meta property="og:url" content="https://www.atmediaplus-consultancy.org" />
        <meta property="og:site_name" content="@Media+ Consultancy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="@Media+ Consultancy | Media consultants" />
        <meta name="twitter:description" content="Media Consultancy and Campaign outsource" />
        <meta name="twitter:image" content="https://www.atmediaplus-consultancy.org/images/mediapluslogo.png" />
        <title>@Media+ Consultancy | Media consultants</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
        <link rel="icon" href="/images/mediapluslogo.png" />
      </Head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </>
  )
}

export default Layout
