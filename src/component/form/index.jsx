import React, { PureComponent } from "react";
import "./styles.scss";

import Input from "../input";

class Form extends PureComponent {
  handleChange(field, e) {
    const { onChange } = this.props;
    let { value } = e.target;
    onChange(value, field);
  }
  render() {
    const { city = '' } = this.props;
    return (
      <div className="form">
        <Input
          type="text"
          onChange={this.handleChange.bind(this, "city")}
          label="City"
          bold
          value={city}
          placeholder="Selected City"
          className="form--input"
        />
      </div>
    );
  }
}

Form.defaultProps = {
  onChange: (value, field) => {},
  onCvvBlur: () => {},
  onCvvFocus: () => {}
};

export default Form;
