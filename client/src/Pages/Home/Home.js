import React from "react";
import "./HomeStyle.css";
import Records from "../../Components/Records/Records";
import Form from "../../Components/Form/Form";

const Home = () => {
  return (
    <section className="home-section">
      <Form />
      <Records />
    </section>
  );
};

export default Home;
