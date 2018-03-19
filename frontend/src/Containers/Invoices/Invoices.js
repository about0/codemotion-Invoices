import React, { Component } from "react";
import Aux from "../../Components/Hoc/Aux_wrapper";
import { Button } from "react-bootstrap";
import Modal from "../../Components/Hoc/Modal";
import CreateInvoice from "./createInvoice";
import InvoicesList from "../../Components/Invoices/InvoicesList";
import UnifiedList from "../../Components/Shared/unifiedList";
import Axios from "axios";

class Invoices extends Component {
  componentWillMount = () => {
    this.getInvoices();
  };

  state = {
    isOpen: false,
    invoices: []
  };

  toggleModal = () => {
    this.getInvoices();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getInvoices = () => {
    Axios.get("http://localhost:8000/api/invoices/", {
      responseType: "json"
    }).then(response => {
      const invoices = response.data;
      this.setState({
        invoices: invoices
      });
    });
  };

  handleChange = (event, item) => {
    const fieldName = event.target.name;
    const eventValue = event.target.value;
    const parsedId = Number.parseInt(item.id, 10);
    const copyInvoicesList = [...this.state.invoices];

    const invoiceIndex = copyInvoicesList.findIndex(
      customer => customer.id === parsedId
    );
    copyInvoicesList[invoiceIndex][fieldName] = eventValue;

    this.setState({
      invoices: copyInvoicesList
    });

    Axios.put(`http://localhost:8000/api/invoices/${item.id}`, {
      [fieldName]: eventValue
    });
  };

  render() {
    return (
      <Aux>
        <UnifiedList
          array={this.state.invoices}
          secondColumnName="Id"
          thirdColumnName="Customer Id"
          fourthColumnName="Discount"
          fifthColumnName="Total Price"
          secondColumnValue="id"
          thirdColumnValue="customer_id"
          fourthColumnValue="discount"
          fifthColumnValue="total"
          thirdColumnType="number"
          fourthColumnType="number"
          fifthColumnType="number"
          onChange={this.handleChange}
        />
        <Button onClick={this.toggleModal} bsStyle="info">
          Create Invoice
        </Button>
        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <CreateInvoice />
        </Modal>
      </Aux>
    );
  }
}

export default Invoices;
