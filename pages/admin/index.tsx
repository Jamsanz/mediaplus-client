import React, { useEffect, useState } from 'react'
import Layout from '../../src/components/adminLayout'
import Paper from '@mui/material/Paper'
import Contacts from '@components/contact-report'

const Home: React.FC = () => {

  return (
    <Layout>
      <Paper>
        <Contacts />
      </Paper>
    </Layout>
  )
}

export default Home
