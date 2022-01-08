import React, { useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import data from "@public/meta.json";
import BlogCard from '@components/cards/blogCards';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Cards: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    AOS.refresh();
  }, []);
  return (
    <div className="grey-1 section-cards" id="services" data-aos="zoom-in">
      <Container className="my-5 flex-grow-1">
        <div className="services-header my-5 text-center transition">
          <h1 className="text-center">
            So, How Can We Help You?
          </h1>
          <hr />
          <p>We are your goto team on all sorts of media research, campaign, <br />advertisement and media marketing</p>
        </div>
        <Row data-aos="fade-up">
          {(data?.plugins ?? []).map((plugin) => (
            <Col md={4} key={plugin.name} className="mb-3">
              <Card className="border-none mi-card">
                <Card.Body>
                  <Card.Title className="text-center indigo-text">
                    <h1><i className={plugin.icon}></i></h1>
                    {plugin.name}
                  </Card.Title>
                  <Card.Text className="p">{plugin.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Row className="space-between">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Row> */}
      </Container>
    </div>
  );
};
