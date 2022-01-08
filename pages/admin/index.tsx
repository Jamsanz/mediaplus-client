import React, { useEffect, useState } from 'react'
import AdminLayout from './layout'
import Paper from '@mui/material/Paper'
import Contacts from '@components/contact-report'
import router from 'next/router'
import { Spinner } from 'react-bootstrap'

const Home: React.FC = (): JSX.Element => {

  return (
    <AdminLayout>
      <Paper>
        <Contacts />
      </Paper>
    </AdminLayout>
  )
}

export default Home
