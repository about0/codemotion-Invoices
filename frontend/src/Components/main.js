import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./main.css";
import Invoices from "../Containers/Invoices/Invoices";
import Customers from "../Containers/Customers/Customers";

const main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Invoices />} />
      <Route path="/customers" component={Customers} />
    </Switch>
  </BrowserRouter>
);

export default main;
