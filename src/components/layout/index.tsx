import { Footer } from '@components/footer'
import { Header } from '@components/header'
import Head from 'next/head'
import React from 'react'

const Layout = ({children}:any): JSX.Element => {
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
