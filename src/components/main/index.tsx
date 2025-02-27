import React, { CSSProperties, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { Button } from "@components";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Main: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      // once: true,
      mirror: false
    });
    AOS.refresh();
  }, []);
  return (
    <div className="Media-header py-5" id="home">
      <Container className="mt-5 py-3" data-aos="zoom-in">
        <Row className="py-5">
          <Col lg={6} md={6} xs={12} className="h-300">
            <h1 className="display-3">
              <span id="plus">@</span>Media+ Limited
            </h1>
            <p className="lead">
              Your number one Research and Media consult!
            </p>
            <Button
              variant="primary"
              size="lg"
              href="#contact"
            >
              Get In touch
            </Button>
          </Col>
          <Col lg={6} md={6} xs={12} className="col-hidden">
            <Image
              src="/images/postIL.png"
              alt='@Media+'
              className="main-img"
              layout="fill"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
