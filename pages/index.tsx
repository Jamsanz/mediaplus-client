import React from "react";

import { Main, Cards } from "@components";
import Layout from "@components/layout";
import ContactForm from "@components/contact-form";
import Section from "@components/section";

const Home: React.FC = (): JSX.Element => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <Main />
        <Cards />
        <Section />
        <ContactForm />
      </Layout>
    </div>
  );
};

export default Home;
