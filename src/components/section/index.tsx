import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';


const Section: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    AOS.refresh();
  }, []);
  return (
    <Container data-aos="zoom-out">
      <Row className="section" id="About">
        <Col md={6} xs={12} className="order-lg-2">
          <div className="text-about">
            <h1 className="text-center">About Us</h1>
            <p>
              @Media+ is a media consulting firm involved in Media Campaign,
              Social Media Marketing and Campaign,
              Advertising and PR campaign, social and media research, media training,
              writing of speeches,
              publishing, content production, Measurement and Evaluation etc...
            </p>
            <p>
              <strong>Vision: </strong><br />
              To be a world class media campaign and media research organization with penchant for
              excellence that will be the standard for many industries.
            </p>
            <p>
              <strong>Mission: </strong><br />
              We are posistioned to carry out excellent media campaigns,
              research and training to the satisfaction of our teaming clients
              globally as their interests are our guides to optimum service delivery.
            </p>
            <p>
              We are experts in crises communication, event planning, issues management
              relations, brand management and OPR etc.
            </p>

            <p><strong>Check out our blogs for our works: <Link legacyBehavior href="/blog"><a className="text-black my-3 underline">Blog</a></Link></strong></p>
          </div>
        </Col>
        <Col md={6} xs={12} className="order-lg-1 mt-4">
          <img
            src="/images/banner.jpg"
            alt='@Media+ banner'
            className="section-img"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Section;
