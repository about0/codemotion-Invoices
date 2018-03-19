import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

class productList extends Component {
  incProduct = () => {
    this.props.handleProductIncrease(this.props.product.id);
  };

  decProduct = () => {
    this.props.handleProductDecrease(this.props.product.id);
  };

  deleteProduct = () => {
    this.props.handleProductDeletion(this.props.product.id);
  };

  render() {
    return (
      <tr key={this.props.product.id}>
        <td>{this.props.index + 1}</td>
        <td>{this.props.product.name}</td>
        <td style={{ margin: 5 }}>
          <Button onClick={this.decProduct}> - </Button>
          <span style={{ padding: 5, fontWeight: "bold" }}>
            {this.props.product.quantity}
          </span>
          <Button onClick={this.incProduct}> + </Button>
        </td>
        <td>${this.props.unitPrice.toFixed(2)}</td>
        <td>
          <Button bsStyle="danger" onClick={this.deleteProduct}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

productList.propTypes = {
  product: PropTypes.object.isRequired,
  handleProductIncrease: PropTypes.func.isRequired,
  handleProductDecrease: PropTypes.func.isRequired,
  handleProductDeletion: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired
};

export default productList;
