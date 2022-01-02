import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import { http } from 'utils/utils';
import { useRouter } from 'next/router';
import { IUser } from '../../src/interfaces/IUser';
import axios, { AxiosResponse } from 'axios';
import Layout from '@components/layout';
import PostCard from 'pages/admin/components/postCard';
import { Container } from 'react-bootstrap';

const BlogPost = ({ data }: { data: any }) => {
    return (
        <Layout>
            <Container className='mt-5 pt-5 justify-center'>
                <PostCard {...data} page="details" />
            </Container>
        </Layout>
    )
}

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data }: AxiosResponse = await http.get('/post');
    const paths = (data as any).Posts.map((user: IUser) => { return { params: { id: user._id } } });
    return {
        paths,
        fallback: false,
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data }: AxiosResponse = await http.get(`/post/${params?.id}`)
    return {
        props: {
            data: (data as any).data
        }
    }
}
