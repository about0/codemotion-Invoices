import React, { Component } from "react";
import Aux from "../../Components/Hoc/Aux_wrapper";
import UnifiedList from "../../Components/Shared/unifiedList";
import Axios from "axios";

class Customers extends Component {
  componentWillMount = () => {
    this.getCustomersHandler();
  };

  state = {
    isOpen: false,
    productsList: []
  };

  toggleModal = () => {
    this.getInvoices();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getCustomersHandler = () => {
    Axios.get(`http://localhost:8000/api/products/`, {
      responseType: "json"
    }).then(response => {
      const data = response.data;
      this.setState({
        productsList: data
      });
    });
  };
  handleCustomerNameChange = (event, item) => {
    const name = event.target.value;
    const parsedId = Number.parseInt(item.id, 10);
    const copyCustomerList = [...this.state.customersList];

    const customerIndex = copyCustomerList.findIndex(
      customer => customer.id === parsedId
    );
    copyCustomerList[customerIndex].name = name;

    this.setState({
      customersList: copyCustomerList
    });

    Axios.put(`http://localhost:8000/api/products/${item.id}`, {
      name: name
    });
  };

  handleChange = (event, item) => {
    const fieldName = event.target.name;
    const eventValue = event.target.value;
    const parsedId = Number.parseInt(item.id, 10);
    const copyProductsList = [...this.state.productsList];

    const productIndex = copyProductsList.findIndex(
      customer => customer.id === parsedId
    );
    copyProductsList[productIndex][fieldName] = eventValue;

    this.setState({
      productsList: copyProductsList
    });

    Axios.put(`http://localhost:8000/api/products/${item.id}`, {
      [fieldName]: eventValue
    });
  };

  render() {
    return (
      <Aux>
        <UnifiedList
          array={this.state.productsList}
          secondColumnName="Id"
          thirdColumnName="Name"
          fourthColumnName="Price"
          secondColumnValue="id"
          thirdColumnValue="name"
          fourthColumnValue="price"
          onChange={this.handleChange}
        />
      </Aux>
    );
  }
}

export default Customers;
