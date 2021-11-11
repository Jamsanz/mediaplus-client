import React, { useEffect, useState } from 'react'
import AdminLayout from './layout'
import Paper from '@mui/material/Paper'
import Contacts from '@components/contact-report'
import router from 'next/router'
import { Spinner } from 'react-bootstrap'

const Home: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(()=>{
    if (!(window.localStorage.getItem('MediaUser'))) {
      router.push('/admin/signIn');
    }else{
      setLoaded(true);
    }
  }, []);

    return (
        loaded ? 
        <AdminLayout>
          <Paper>
            <Contacts />
          </Paper>
        </AdminLayout> 
        : 
        <div className="place-center">
          <Spinner animation="border" variant="primary"/>
        </div>
    )
}

export default Home
