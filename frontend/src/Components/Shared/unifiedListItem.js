import React from "react";
import { Button, FormControl } from "react-bootstrap";
import Modal from "../../Components/Hoc/Modal";

const unifiedListItem = props => (
  <div>
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.thirdColumnValue}</td>
      <td>{props.fourthColumnValue}</td>
      <td>{props.fifthColumnValue}</td>
    </tr>
    <Button onClick={props.toggleEdit}>Edit</Button>
    {props.toggleEdit ? (
      <Modal onClose={this.toggleEdit}>
        <FormControl value="test" />
      </Modal>
    ) : null}
  </div>
);

export default unifiedListItem;
