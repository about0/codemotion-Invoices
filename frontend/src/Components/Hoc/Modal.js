import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

class Modal extends React.Component {
  render () {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 800,
      minHeight: 300,
      height: "70%",
      margin: "0 auto",
      padding: 30,
      overflow: "auto",
      position: "relative"
    };

    const closeButtonDiv = {
      position: "absolute",
      right: 78
    };

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          {this.props.children}

          <div style={closeButtonDiv} className="footer">
            <Button bsStyle="warning" onClick={this.props.onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
