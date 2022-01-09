import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Spinner, Table } from 'react-bootstrap';
import Layout from '../../src/components/adminLayout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toastr, { DeleteAlert, http } from 'utils/utils';
import { GetServerSideProps, GetStaticProps } from 'next';
import { IPost } from '../../src/interfaces/IPosts';
import { addPost } from '@redux/slices/post';
import router from 'next/router';
import { blue, red, teal } from '@mui/material/colors';

const Blog = ({ data: dataa }: { data: any }) => {
    const [data, setData] = useState<any>(dataa);
    const dispatch = useDispatch();
    const handleEdit = (data: IPost): void => {
        dispatch(addPost(data));
        router.push('/admin/post');
    };
    const handleDelete = (dataa: IPost): void => {
        DeleteAlert().then((result) => {
            if (result.isConfirmed) {
                http.delete(`/post/${dataa._id}`)
                    .then(({ data: dataaa, status }) => {
                        if (status === 200) {
                            toastr.success('successfully deleted');
                            setData(data.filter((item: IPost) => item._id !== dataa._id));
                            return;
                        }
                        toastr.error((dataaa as any).message)
                    }).catch((e: any) => toastr.error(e));
            }
        });
    };
    // useEffect(() => {
    //     http.get('/post')
    //         .then(res => setData(res.data))
    //         .then(() => console.log(data))
    //         .catch(e => console.error(e));
    // }, []);
    let i = 1;
    return (
        <Layout>
            <Paper className='center-table p-3'>

                {data ? <Table
                    borderless
                    hover
                    responsive
                    striped
                >
                    <thead>
                        <tr className='head'>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.Posts.map((data: IPost) => (
                                <tr>
                                    <th scope='row'>{i++}</th>
                                    <td>{data.title}</td>
                                    <td className="ellipsis">{data.body}</td>
                                    <td>{data?.author?.name}</td>
                                    <td>
                                        <EditIcon
                                            color='primary'
                                            onClick={(e) => handleEdit(data)}
                                            sx={{ cursor: 'pointer', '&:hover': { color: blue[500] } }}
                                        />
                                        {' '}
                                        <DeleteIcon
                                            color='error'
                                            onClick={(e) => handleDelete(data)}
                                            sx={{ cursor: 'pointer', '&:hover': { color: red[500] } }}
                                        />

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> :
                    <div className="place-center">
                        <Spinner animation="border" variant="primary">
                            Loading...
                        </Spinner>

                    </div>
                }
            </Paper>
        </Layout>
    )
}

export default Blog;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data, status } = await http.get('/post');
    return {
        props: {
            data: (data as any)
        },
        revalidate: 1,
    }
}