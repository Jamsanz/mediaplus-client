import React, { CSSProperties } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { Button } from "@components";

export const Main: React.FC = (): JSX.Element => {
  return (
    <div className="Media-header py-5" >
      <Container className="mt-5">
        <Row className="py-5">
          <Col lg={6} md={6} xs={12}>
            <h1 className="display-3">
              <span id="plus">@</span>Media+ Consultancy
            </h1>
            <p className="lead">
              Your number one Research and Media plug!
            </p>
            <Button
              variant="primary"
              size="lg"
            >
              Get Started
            </Button>
        </Col>
        <Col lg={6} md={6} xs={12}>
          <Image
            src="/images/postIL.png"
            className='slide-in-top'
            alt=''
            layout="fill"
          />
        </Col>
        </Row>
      </Container>
    </div>
  );
};
