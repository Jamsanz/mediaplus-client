import Layout from "@components/layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import { GetStaticProps } from "next";
import { http } from "utils/utils";
import { IPost } from "@components/posts";
import PostCard from "../src/components/postCard";

const Blog = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [itemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>();

  const [loading, setLoading] = useState<boolean>(false);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = itemsPerPage * currentPage;

  const currentItems: IPost[] = data?.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const nextPage = (): void => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (data) {
      const page = [];
      for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        page.push(i);
      }
      setPages(page);
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    http
      .get("/post")
      .then((res: any) => setData(res.data.Posts))
      .catch((e) => console.error(e)).finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Container className="my-5 py-5">
        <div className="blog-subheader">
          <h1 className="blog-header-h1">Blog.</h1>
        </div>
        <section className="banner-img mb-5">
          <img
            src="/images/sync.svg"
            alt="blog banner"
            className="blog-banner-img"
          />
        </section>
        <section className="mt-5 pt-5">
          {!loading ? (
            <Row>
              {data &&
                currentItems.map((data: IPost, index) => (
                  <Col key={index} md={6} sm={12}>
                    <PostCard {...data} page="blog" />
                  </Col>
                ))}
            </Row>
          ) : (
            <div className="place-center">
              <Spinner animation="border" variant="primary">
                Loading...
              </Spinner>
            </div>
          )}
          <div className="flex justify-center">
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => prevPage()}
                disabled={currentPage === 1}
              />
              {pages?.map((page) => (
                <Pagination.Item
                  onClick={() => changePage(page)}
                  active={page === currentPage}
                >
                  {page}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => nextPage()}
                disabled={currentPage === pages?.length}
              />
              <Pagination.Last onClick={() => setCurrentPage(pages!.length)} />
            </Pagination>
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export default Blog;
