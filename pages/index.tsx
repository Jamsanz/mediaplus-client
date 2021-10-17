import React from "react";

import { Main, Cards } from "@components";
import Layout from "@components/layout";
import ContactForm from "@components/contact-form";

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <Main />
        <Cards />
        <ContactForm />
      </Layout>
    </div>
  );
};

export default Home;
