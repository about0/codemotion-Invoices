import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./main.css";
import Invoices from "../Containers/Invoices/Invoices";
import Customers from "../Containers/Customers/Customers";
import Products from "../Containers/Products/Products";

const main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Invoices} />
      <Route exact path="/invoices" component={Invoices} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
    </Switch>
  </BrowserRouter>
);

export default main;
