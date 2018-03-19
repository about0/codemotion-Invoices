import React from "react";
import "./App.css";

import Layout from "../Components/Layout/Layout";
import Aux from "../Components/Hoc/Aux_wrapper";
import Main from "../Components/main";

const app = () => (
  <Aux>
    <Layout />
    <div>
      <Main />
    </div>
  </Aux>
);

export default app;
