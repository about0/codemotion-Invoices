import React, { PureComponent } from "react";
import { Table, FormControl } from "react-bootstrap";

class UnifiedList extends PureComponent {
  state = {
    toggleEdit: false
  };

  toggleEdit = () => {
    this.setState({
      toggleEdit: !this.state.toggleEdit
    });
  };

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>{this.props.secondColumnName}</th>
            <th>{this.props.thirdColumnName}</th>
            {this.props.fourthColumnName ? (
              <th>{this.props.fourthColumnName}</th>
            ) : null}
            {this.props.fifthColumnName ? (
              <th>{this.props.fifthColumnName}</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {this.props.array.map((item, index) => (
            <tr key={item.id}>
              <td>{item[this.props.secondColumnValue]}</td>
              <td style={{ width: "auto" }}>
                <FormControl
                  type={this.props.thirdColumnType || "text"}
                  value={item[this.props.thirdColumnValue] || ""}
                  onChange={e => this.props.onChange(e, item)}
                  name={this.props.thirdColumnValue}
                />
              </td>
              <td>
                <FormControl
                  type={this.props.fourthColumnType || "text"}
                  value={item[this.props.fourthColumnValue] || ""}
                  onChange={e => this.props.onChange(e, item)}
                  name={this.props.fourthColumnValue}
                />
              </td>
              {this.props.fifthColumnValue ? (
                <td>
                  <FormControl
                    type={this.props.fifthColumnType || "text"}
                    style={{ maxWidth: "150" }}
                    value={item[this.props.fifthColumnValue] || ""}
                    onChange={e => this.props.onChange(e, item)}
                    name={this.props.fifthColumnValue}
                  />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default UnifiedList;
