import React, { Component } from "react";
import Aux from "../../Components/Hoc/Aux";
import { Button } from "react-bootstrap";
import Modal from "../../Components/Hoc/Modal";
import CreateInvoice from "./createInvoice";
import InvoicesList from "../../Components/Invoices/InvoicesList";
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

  render () {
    return (
      <Aux>
        <InvoicesList invoices={this.state.invoices} />
        <Button onClick={this.toggleModal}>Create Invoice</Button>
        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <CreateInvoice />
        </Modal>
      </Aux>
    );
  }
}

export default Invoices;
