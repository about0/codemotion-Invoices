import React, { Component } from "react";
import Aux from "../../Components/Hoc/Aux";
import UnifiedList from "../../Components/Shared/unifiedList";
import Axios from "axios";

class Customers extends Component {
  componentWillMount = () => {
    this.getCustomersHandler();
  };

  state = {
    isOpen: false,
    customersList: []
  };

  toggleModal = () => {
    this.getInvoices();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getCustomersHandler = () => {
    Axios.get(`http://localhost:8000/api/customers/`, {
      responseType: "json"
    }).then(response => {
      const data = response.data;
      this.setState({
        customersList: data
      });
    });
  };
  handleCustomerNameChange = (event, item) => {
    const name = event.target.value;
    const parsedId = Number.parseInt(item.id, 10);
    const copyCustomerList = [...this.state.customersList];

    const customerIndex = copyCustomerList.findIndex(customer => customer.id === parsedId);
    copyCustomerList[customerIndex].name = name;

    console.log(customerIndex, name);

    this.setState({
      customersList: copyCustomerList
    });

    Axios.put(`http://localhost:8000/api/customers/${item.id}`, {
      name: name
    });
  };

  handleCustomerChange = (event, item) => {
    const fieldName = event.target.name;
    const eventValue = event.target.value;
    const parsedId = Number.parseInt(item.id, 10);
    const copyCustomerList = [...this.state.customersList];

    const customerIndex = copyCustomerList.findIndex(customer => customer.id === parsedId);
    copyCustomerList[customerIndex][fieldName] = eventValue;

    console.log(customerIndex, name);

    this.setState({
      customersList: copyCustomerList
    });

    Axios.put(`http://localhost:8000/api/customers/${item.id}`, {
      [fieldName]: eventValue
    });
  };

  render () {
    return (
      <Aux>
        <UnifiedList
          array={this.state.customersList}
          secondColumnName="Id"
          thirdColumnName="Name"
          fourthColumnName="Address"
          fifthColumnName="Phone"
          secondColumnValue="id"
          thirdColumnValue="name"
          fourthColumnValue="address"
          fifthColumnValue="phone"
          thirdColumnChange={this.handleCustomerChange}
        />
      </Aux>
    );
  }
}

export default Customers;
