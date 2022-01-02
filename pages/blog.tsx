import Layout from '@components/layout'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'

const Blog = () => {
    return (
        <Layout>
            <Container className="my-5 py-5">
                <div className="blog-subheader">
                    <h1 className="blog-header-h1">Blog.</h1>
                </div>
                <section className='banner-img'>
                    <img
                        src="/images/blogging.svg"
                        // width={50}
                        // height={50}
                        // layout='responsive'
                        alt=""
                        className="blog-banner-img"
                    />
                </section>
                <Link href={{ pathname: 'post/[id]', query: { id: 12345 } }}>
                    <a>Post details</a>
                </Link>
                <Row>
                    <Col md={6} sm={12}>
                    </Col>

                    <Col md={6} sm={12}>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Blog;
