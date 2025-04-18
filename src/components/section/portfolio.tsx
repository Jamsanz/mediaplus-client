import React, { useState, MouseEvent, useEffect } from "react";
import { Col, Container, Row, Card, Modal } from "react-bootstrap";
import { data as d, http } from "utils/utils";
import { IStakeholder } from "../../interfaces/IStakeholder";

const Portfolio = () => {
  const [data, setData] = useState<IStakeholder[]>(d);
  const [show, setShow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IStakeholder>();

  const toggle = (e: MouseEvent<HTMLButtonElement>, data?: IStakeholder): void => {
    e.preventDefault();
    data && setModalData(data);
    setShow(!show);
  };
  useEffect(() => {
    http
      .get("/stakeholder")
      .then((res: any) => setData(res.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Container className="my-5 flex-grow-1">
      <div className="services-header my-5 text-center transition">
        <h1 className="text-center">Out Team of Experts</h1>
        <hr />
      </div>
      <Row data-aos="fade-up">
        {data?.map((portfolio) => (
          <Col md={4} key={portfolio.name} className="mb-3">
            <Card className="border-none mi-card portfolio-card">
              <Card.Img
                variant="top"
                className="card-img"
                src={portfolio.image}
                alt={portfolio.name}
              />
              <Card.Body>
                <Card.Title>{portfolio.name}</Card.Title>
                <Card.Text className="text-justify">
                  {portfolio?.description?.substring(0, 200) + "..."}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="card-footer">
                <button
                  className="readmore-btn"
                  onClick={(e) => toggle(e, portfolio)}
                >
                  Read more
                </button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        {modalData && (
          <div className="modal-data">
            <img
              className="rounded-img"
              src={modalData.image}
              alt={modalData.name}
              loading="lazy"
            />
            <h4 className="text-center">{modalData.name}</h4>
            <p>{modalData.description}</p>
          </div>
        )}
        <Modal.Footer>
          <button className="readmore-btn" onClick={toggle}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Portfolio;
