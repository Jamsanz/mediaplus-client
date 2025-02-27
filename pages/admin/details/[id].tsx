import { GetStaticPaths, GetStaticProps } from "next";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { http } from "utils/utils";
import { IUser } from "../../../src/interfaces/IUser";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import Layout from "../../../src/components/adminLayout";
import router, {useRouter} from "next/router";
import { Paper } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import moment from "moment";
// import Link from 'next/link';

const Details = ({ data }: { data: IUser }) => {
  const [user, setUser] = useState<IUser>(data);
  const [Loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  if (route.isFallback) {
    return <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <Spinner animation="border" />
      <p>Loading...</p>
    </div>
  }

  // eslint-disable-next-line no-empty-function
  const handleChange = (e: ChangeEvent): void => {};

  // eslint-disable-next-line no-empty-function
  const handleSubmit = (e: FormEvent): void => {};
  return (
    <Layout>
      <Paper className="p-3">
        <Button
          className="cursor mb-3"
          onClick={() => router.back()}
          role="link"
        >
          {" "}
          <ChevronLeftIcon /> Go back{" "}
        </Button>
        <Form role="form" onSubmit={handleSubmit}>
          <div className="contact-input">
            <i className="fas fa-user"></i>
            <input
              id="name"
              placeholder="Full Name"
              type="text"
              onChange={handleChange}
              name="name"
              value={user?.name}
              required
              readOnly
            />
          </div>
          <div className="contact-input">
            <i className="fas fa-phone"></i>
            <input
              id="phone"
              placeholder="Phone"
              type="text"
              onChange={handleChange}
              name="phone"
              value={user?.phone}
              required
              readOnly
            />
          </div>
          <div className="contact-input">
            <i className="fas fa-calendar"></i>
            <input
              id="email"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              name="email"
              value={moment(user?.createdAt).format("Do MMMM, YYYY h: mm: ss A")}
              required
              readOnly
            />
          </div>
          <div className="contact-input">
            <i className="fas fa-at"></i>
            <input
              id="email"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              name="email"
              value={user?.email}
              required
              readOnly
            />
          </div>
          <div className="contact-input">
            <i className="fas fa-network-wired"></i>
            <select
              id="service"
              // placeholder="Service required"
              onChange={handleChange}
              name="service"
              value={user?.service}
              required
            >
              <option value="">Service Required</option>
              <option value="Media Campaign">Media Campaign</option>
              <option value="Research">Research</option>
            </select>
          </div>
          <div className="contact-input">
            <i className="fas fa-network-wired"></i>
            <input
              id="service"
              placeholder="Service required"
              onChange={handleChange}
              name="service"
              value={user?.status}
              required
              readOnly
            />
          </div>
          <FormGroup>
            <InputGroup>
              <InputGroup.Text className="addon">
                <i className="fas fa-envelope msg"></i>
              </InputGroup.Text>
              <FormControl
                id="message"
                as="textarea"
                style={{ height: "300px" }}
                placeholder="Message"
                onChange={handleChange}
                name="message"
                value={user?.message}
                readOnly
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            {/* <Button
              type="submit"
              block
              size="lg"
              variant="primary"
              disabled={Loading}
            >
              {Loading ? <Spinner animation="border" /> : "Update Status"}
            </Button> */}
          </FormGroup>
        </Form>
      </Paper>
    </Layout>
  );
};

export default Details;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: AxiosResponse = await http.get("/contacts");
  const paths = (data as any).contacts.map((user: IUser) => {
    return { params: { id: user._id } };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: AxiosResponse = await http.get(`/contacts/${params?.id}`);
  return {
    props: {
      data: (data as any).data,
    },
  };
};
