import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import { http } from 'utils/utils';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import Layout from '@components/layout';
import PostCard from 'pages/admin/components/postCard';
import { Container } from 'react-bootstrap';
import router from 'next/router';
import { IPost } from '../../src/interfaces/IPosts';
// import Link from 'next/link';

const BlogPost = ({ data }: { data: IPost }) => {
    return (
        <Layout>
            <Container className='mt-5 pt-5 justify-center'>
                <p className='cursor' onClick={() => router.back()} role="link"> Go back </p>
                <PostCard {...data} page="details" />
            </Container>
        </Layout>
    )
}

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data }: AxiosResponse = await http.get('/post');
    const paths = (data as any).Posts.map((post: IPost) => { return { params: { id: post._id } } });
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
