import React, { useEffect } from 'react'
import AdminLayout from './layout'
import Paper from '@mui/material/Paper'
import Contacts from '@components/contact-report'
import router from 'next/router'

const Home: React.FC = (): JSX.Element => {
  useEffect(()=>{
    if (!(window.localStorage.getItem('MediaUser'))) {
      router.push('/admin/signIn');
    }
  }, []);

    return (
        <AdminLayout>
          <Paper>
            <Contacts />
          </Paper>
        </AdminLayout>
    )
}

export default Home
