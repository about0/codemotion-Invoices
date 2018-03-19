import React, { PureComponent } from "react";
import "./createInvoice.css";
import { FormGroup, ControlLabel, FormControl, Table, Button, HelpBlock, Label, Alert } from "react-bootstrap";
import Aux from "../../Components/Hoc/Aux";
import Axios from "axios";
import ProductListItem from "../../Components/Invoices/Products/productListItem";

class CreateInvoice extends PureComponent {
  componentWillMount = () => {
    this.getCustomersHandler();
    this.getProductsHandler();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.selectedProducts !== this.state.selectedProducts ||
      prevState.discountValue !== this.state.discountValue
    ) {
      this.calculateTotalPrice();
    } else if (this.state.selectedCutsomerId && this.state.totalPrice > 0 && !this.state.invoiceCreated) {
      this.createInvoiceRequest();
      this.setState({
        invoiceCreated: true
      });
    } else if (
      (prevState.totalPrice !== this.state.totalPrice && this.state.invoiceCreated) ||
      (prevState.selectedCutsomerId !== this.state.selectedCutsomerId && this.state.invoiceCreated) ||
      (prevState.discountValue !== this.state.discountValue && this.state.invoiceCreated)
    ) {
      this.updateInvoiceRequest();
    }
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

  getProductsHandler = () => {
    Axios.get(`http://localhost:8000/api/products`, {
      responseType: "json"
    }).then(response => {
      const data = response.data;
      this.setState({
        productsList: data
      });
    });
  };

  state = {
    customersList: [],
    selectedCutsomerId: null,
    productsList: [],
    selectedProduct: {},
    selectedProductId: null,
    selectedProducts: [],
    invoiceId: null,
    totalPrice: 0,
    disableAddToCartButton: true,
    discountValue: 0,
    isOpen: false,
    toggleCustomerCreationForm: false,
    customerCreationFormValue: "",
    customerCreated: false
  };

  createInvoiceRequest = () => {
    Axios.post("http://localhost:8000/api/invoices", {
      customer_id: this.state.selectedCutsomerId,
      discount: this.state.discountValue,
      total: this.state.totalPrice
    }).then(response => {
      this.setState({
        invoiceId: response.data.id
      });
    });
  };

  updateInvoiceRequest = () => {
    Axios.put(`http://localhost:8000/api/invoices/${this.state.invoiceId}`, {
      customer_id: this.state.selectedCutsomerId,
      discount: Number.parseFloat(this.state.discountValue),
      total: this.state.totalPrice.toFixed(2) / 1
    });
  };

  handleChange = e => {
    const value = e.target.value;
    const inputName = e.target.name;

    this.setState({
      [inputName]: value
    });
  };

  handleQuantityChange = e => {
    const quantity = Number.parseInt(e.target.value, 10);
    const selectedProduct = {
      ...this.state.selectedProduct,
      ...{ quantity: quantity }
    };
    let newSelectedProducts = [...this.state.selectedProducts];
    const productIndex = newSelectedProducts.findIndex(product => product.id === selectedProduct.id);

    if (productIndex > -1) {
      newSelectedProducts = [
        ...newSelectedProducts.slice(0, productIndex),
        selectedProduct,
        ...newSelectedProducts.slice(productIndex + 1)
      ];
    }

    const calculatedArray = [...this.state.selectedProducts, selectedProduct];

    console.log(calculatedArray);

    let calculatedPrice = 0;

    calculatedArray.forEach(product => {
      const productList = [...this.state.productsList];
      const parsedProductId = Number.parseInt(product.id, 10);
      calculatedPrice += productList.find(obj => obj.id === parsedProductId).price * quantity;
    });

    this.setState({
      totalPrice: calculatedPrice,
      selectedProducts: calculatedArray
    });
  };

  handleProductSelection = e => {
    const selectedProductId = Number.parseInt(e.target.value, 10);
    const alreadyListed = this.state.selectedProducts.find(product => product.id === selectedProductId);
    console.log(alreadyListed || Number.isNaN(selectedProductId));
    if (!alreadyListed && !Number.isNaN(selectedProductId)) {
      this.setState({
        disableAddToCartButton: false,
        selectedProductId
      });
    } else {
      this.setState({
        disableAddToCartButton: true,
        selectedProductId: null
      });
    }
  };

  handleProductAddition = () => {
    const selectedProductId = Number.parseInt(this.state.selectedProductId, 10);
    const selectedProduct = this.state.productsList.find(product => product.id === selectedProductId);
    selectedProduct.quantity = 1;
    const selectedProductsList = [...this.state.selectedProducts].concat(selectedProduct);

    this.setState({
      selectedProducts: selectedProductsList,
      disableAddToCartButton: true
    });
  };

  handleCustomerSelection = e => {
    const selectedCutsomerId = Number.parseInt(e.target.value, 10);

    this.setState({
      selectedCutsomerId
    });
  };

  handleProductIncrease = id => {
    const parsedId = Number.parseInt(id, 10);
    let selectedProductsList = [...this.state.selectedProducts];
    const productIndex = selectedProductsList.findIndex(product => product.id === parsedId);
    selectedProductsList[productIndex].quantity++;
    this.setState({
      selectedProducts: selectedProductsList
    });
  };

  handleProductDecrease = id => {
    const parsedId = Number.parseInt(id, 10);
    let selectedProductsList = [...this.state.selectedProducts];
    const productIndex = selectedProductsList.findIndex(product => product.id === parsedId);
    if (selectedProductsList[productIndex].quantity <= 1) {
      return;
    }
    selectedProductsList[productIndex].quantity--;
    this.setState({
      selectedProducts: selectedProductsList
    });
  };

  handleProductDeletion = id => {
    const parsedId = Number.parseInt(id, 10);
    let selectedProductsList = [...this.state.selectedProducts];
    const productIndex = selectedProductsList.findIndex(product => product.id === parsedId);
    selectedProductsList.splice(productIndex, 1);
    this.setState({
      selectedProducts: selectedProductsList
    });
  };

  toggleCustomerCreation = () => {
    this.setState({
      toggleCustomerCreationForm: !this.state.toggleCustomerCreationForm,
      customerCreated: false
    });
  };

  calculateTotalPrice = () => {
    const discount = Number.parseFloat(this.state.discountValue, 10);
    let totalPrice = this.state.selectedProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    if (discount > 0) {
      totalPrice = totalPrice - totalPrice * discount / 100;
    }

    this.setState({
      totalPrice
    });
  };

  handleCustomerCreation = () => {
    Axios.post("http://localhost:8000/api/customers", {
      name: this.state.customerCreationFormValue
    }).then(response => {
      const status = Number.parseInt(response.status, 10);
      if (status === 200) {
        this.getCustomersHandler();
        this.setState({
          toggleCustomerCreationForm: false,
          customerCreated: true
        });
      }
    });
  };

  getValidationState () {
    const value = Number.parseInt(this.state.discountValue, 10);
    if (value > 100) return "error";
    else if (value > 0 && value <= 100) return "success";
    else if (value < 0) return "warning";
    return null;
  }

  render () {
    const totalPrice =
      this.state.totalPrice >= 0 ? (
        <h3>
          <Label>Total Price: $ {this.state.totalPrice.toFixed(2)}</Label>
        </h3>
      ) : (
        <h3>
          <Label bsStyle="danger">Invalid Price</Label>
        </h3>
      );

    const formControlStyles = {
      width: "50%",
      display: "inline-block",
      verticalAlign: "top"
    };

    const addButtonStyles = {
      display: "inline-block",
      width: "auto",
      marginLeft: 3
    };

    const controlLabelStyles = { display: "block" };
    const formGroupStyles = {
      width: "50%",
      display: "inline-block"
    };

    const messageAlert = this.state.customerCreated ? (
      <Alert bsStyle="success">
        <strong>Success!</strong> The user has been created!
      </Alert>
    ) : (
      ""
    );

    const customersInteractionsForm = this.state.toggleCustomerCreationForm ? (
      <FormGroup style={formGroupStyles}>
        <ControlLabel style={controlLabelStyles}>Create Customer</ControlLabel>
        <FormControl
          style={formControlStyles}
          type="text"
          value={this.state.customerCreationFormValue}
          name="customerCreationFormValue"
          onChange={this.handleChange}
        />
        <Button style={addButtonStyles} onClick={this.handleCustomerCreation} bsStyle="success">
          Create
        </Button>
      </FormGroup>
    ) : (
      <FormGroup style={formGroupStyles}>
        <ControlLabel style={controlLabelStyles}>Select Customer</ControlLabel>
        <FormControl
          style={formControlStyles}
          componentClass="select"
          placeholder="select"
          onChange={this.handleCustomerSelection}
        >
          <option value="other">...</option>
          {this.state.customersList.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </FormControl>

        {messageAlert}
      </FormGroup>
    );

    return (
      <Aux>
        <form className="Invoice">
          {customersInteractionsForm}
          <Button style={{}} onClick={this.toggleCustomerCreation} bsStyle="info">
            Customer Creation Form
          </Button>
          <FormGroup>
            <ControlLabel style={{ display: "block" }}>Select Products</ControlLabel>
            <FormControl
              style={formControlStyles}
              componentClass="select"
              placeholder="select"
              onChange={this.handleProductSelection}
            >
              <option value="other">...</option>
              {this.state.productsList.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}, ${product.price}
                </option>
              ))}
            </FormControl>
            <Button
              style={addButtonStyles}
              onClick={this.handleProductAddition}
              disabled={this.state.disableAddToCartButton}
              bsStyle="success"
            >
              +
            </Button>
          </FormGroup>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectedProducts.map((product, index) => (
                <ProductListItem
                  unitPrice={product.price * product.quantity}
                  key={product.id}
                  product={product}
                  index={index}
                  handleProductIncrease={this.handleProductIncrease}
                  handleProductDecrease={this.handleProductDecrease}
                  handleProductDeletion={this.handleProductDeletion}
                />
              ))}
            </tbody>
          </Table>
          <FormGroup style={{ paddingTop: 10 }} controlId="coupon" validationState={this.getValidationState()}>
            <ControlLabel>Discount</ControlLabel>
            <FormControl
              minLength={0}
              maxLength={0}
              type="number"
              value={this.state.couponCode}
              placeholder="Enter Here"
              onChange={this.handleChange}
              name="discountValue"
              style={{ width: "auto" }}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on numeric value. Allowed from zero up to hundred</HelpBlock>
          </FormGroup>
          {totalPrice}
        </form>
      </Aux>
    );
  }
}

export default CreateInvoice;
