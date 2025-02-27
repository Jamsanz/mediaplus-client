import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { http } from 'utils/utils';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import Layout from '@components/layout';
import PostCard from '../../src/components/postCard';
import { Container, Spinner } from 'react-bootstrap';
import router from 'next/router';
import { IPost } from '../../src/interfaces/IPosts';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const BlogPost = ({ data }: { data: IPost }) => {
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div className='h-screen flex justify-center items-center flex-col gap-4'>
            <Spinner animation="border" />
            <p>Loading...</p>
        </div>
    }
    return (
        <Layout>
            <Container className='mt-5 pt-5 justify-center'>
                <Button className='cursor mb-3 justify-end' onClick={() => router.back()} role="link"> <ChevronLeftIcon /> Go back </Button>
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
        fallback: true,
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data }: AxiosResponse = await http.get(`/post/${params?.id}`)
    return {
        props: {
            data: (data as any).data
        },
        revalidate: 10
    }
}
