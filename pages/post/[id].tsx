import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import { http } from 'utils/utils';
import { useRouter } from 'next/router';
import { IUser } from '../../src/interfaces/IUser';
import axios, { AxiosResponse } from 'axios';

const BlogPost = ({ data }: { data: any }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {data.email}{' '}{id}
        </div>
    )
}

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data }: AxiosResponse = await axios.get('https://mediaplus-server.herokuapp.com/users');
    const paths = (data as any).data.map((user: IUser) => { return { params: { id: user._id } } });
    return {
        paths,
        fallback: false,
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data }: AxiosResponse = await axios.get(`https://mediaplus-server.herokuapp.com/users/${params?.id}`)
    return {
        props: {
            data: (data as any).data
        }
    }
}
