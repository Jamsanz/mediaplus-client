import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Section: React.FC = (): JSX.Element => {
    return (
      <Container>
        <Row className="section" id="About">
            <Col md={6} xs={12} className="order-lg-2">
              <div className="text-about">
                  <h1 className="text-center">Lorem ipsum</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit inventore recusandae tempora minima illo ipsam nulla!
                    Error voluptas veniam maiores animi cum a repellendus, unde modi saepe consectetur reiciendis incidunt?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit inventore recusandae tempora minima illo ipsam nulla!
                    Error voluptas veniam maiores animi cum a repellendus, unde modi saepe consectetur reiciendis incidunt?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit inventore recusandae tempora minima illo ipsam nulla!
                    Error voluptas veniam maiores animi cum a repellendus, unde modi saepe consectetur reiciendis incidunt?
                  </p>
              </div>
            </Col>
            <Col md={6} xs={12} className="order-lg-1">
              <img
                src="/images/realtime.png"
                alt=''
                className="section-img"
              />
            </Col>
        </Row>
      </Container>
    )
}

export default Section
