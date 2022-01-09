import Layout from '@components/layout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { GetStaticProps } from 'next'
import { http } from 'utils/utils'
import { IPost } from '@components/posts'
import PostCard from '../src/components/postCard'

const Blog = () => {
    const [data, setData] = useState<IPost[]>();

    useEffect(() => {
        http.get('/post')
            .then((res: any) => setData(res.data.Posts))
            .catch(e => console.error(e));
    }, []);

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
                    {data ?
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
                        :
                        <div className="place-center">
                            <Spinner animation="border" variant="primary">
                                Loading...
                            </Spinner>
                        </div>
                    }
                </section>
            </Container>
        </Layout>
    )
}

export default Blog;
