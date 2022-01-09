import Layout from '@components/layout'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { http } from 'utils/utils'
import { IPost } from '@components/posts'
import PostCard from '../src/components/postCard'

const Blog = ({ data: dataa }: { data: IPost[] }) => {
    const data = dataa.sort((a, b) => (b as any) - (a as any));
    return (
        <Layout>
            <Container className="my-5 py-5">
                <div className="blog-subheader">
                    <h1 className="blog-header-h1">Blog.</h1>
                </div>
                <section className='banner-img mb-5'>
                    <img
                        src="/images/sync.svg"
                        // width={50}
                        // height={50}
                        // layout='responsive'
                        alt='blog banner'
                        className="blog-banner-img"
                    />
                </section>
                <section className="mt-5 pt-5">
                    <Row>
                        {
                            data && data.map((data: IPost, index) => (
                                <Col key={index} md={6} sm={12}>
                                    <PostCard
                                        {...data}
                                        page="blog"
                                    />
                                </Col>
                            ))
                        }

                    </Row>
                </section>
            </Container>
        </Layout>
    )
}

export default Blog;

export const getServerSideProps: GetServerSideProps = async () => {

    const { data }: { data: any } = await http.get('/post');

    return {
        props: {
            data: data.Posts
        }
    }
}