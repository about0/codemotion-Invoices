import React from "react";
import { Table } from "react-bootstrap";

const invoicesList = ({ invoices }) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Customer ID</th>
        <th>Discount</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map((inv, index) => (
        <tr key={inv.id}>
          <td>{index + 1}</td>
          <td>{inv.customer_id}</td>
          <td>{inv.discount}</td>
          <td>$ {inv.total}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default invoicesList;
