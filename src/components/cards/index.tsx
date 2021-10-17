import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import data from "@public/meta.json";

export const Cards: React.FC = () => {
  return (
    <div className="grey-1" id="services">
      <Container className="my-5 flex-grow-1">
        <div className="services-header my-5 text-center">
          <h1 className="text-center">
            So, How Can We Help You?
          </h1>
          <hr />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Unde pariatur magni,</p>
        </div>
        <Row>
          {(data?.plugins ?? []).map((plugin) => (
            <Col md={4} key={plugin.name} className="mb-3">
              <Card className="border-none mi-card">
                <Card.Body>
                  <Card.Title className="text-center indigo-text">
                    <h1><i className={plugin.icon}></i></h1>
                    {plugin.name}
                    </Card.Title>
                  <Card.Text>{plugin.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
