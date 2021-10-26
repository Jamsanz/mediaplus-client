import Pagination from '@components/pagination'
import Posts from '@components/posts'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import AdminLayout from './admin/layout'

const Paginate: React.FC = (): JSX.Element => {
    const [posts, setPosts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setPostPerPage] = useState<number>(10);
    const [currentPosts, setCurrentPosts] = useState<any>();

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const handleNext = (): void => {
      if (currentPage < Math.ceil(posts.length / postPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    }
    const handlePrev = (): void => {
      if (currentPage > 1) {
        setCurrentPage(currentPage -1 );
      }
    }
    const handleFirst = (): void => {
      setCurrentPage(1);
    }
    const handleLast = (): void => {
      const lastPage = Math.ceil(posts.length / postPerPage);
      setCurrentPage(lastPage);
    }
    const paginate = (num: number): void => {
      setCurrentPage(num);
    }

    useEffect(() => {
        if (posts) {
          setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
        }
    }, [posts, handleFirst, handleNext, handlePrev, handleLast]);

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
          setPosts(res.data);
        })
      .catch(error => console.log(error));
    }, []);

    return (
        <AdminLayout>
          <Container>
            <Paper>
              <Posts
                posts={currentPosts} 
              />
              <Pagination
                postPerPage = {postPerPage}
                setPostPerPage = {setPostPerPage}
                totalPosts = {posts?.length}
                active = {currentPage}
                paginate = {paginate}
                first = {handleFirst}
                next = {handleNext}
                prev = {handlePrev}
                last= {handleLast}
              />
            </Paper>
          </Container>
        </AdminLayout>
    )
}

export default Paginate
