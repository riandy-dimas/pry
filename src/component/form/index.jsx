import React, { PureComponent } from "react";
import "./styles.scss";

import Input from "../input";
import Select from "../select";

class Form extends PureComponent {
  handleChange(field, e) {
    const { onChange } = this.props;
    let { value } = e.target;
    onChange(value, field);
  }
  handleSelect(value) {
    const { onChange } = this.props
    onChange(value, "cityId")
  }
  render() {
    const { city, cities, cityId, filter } = this.props;
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
        <Select 
          items={cities}
          value={cityId}
          valueLabel={city}
          filter={filter}
          label="Nama Kota"
          onChange={this.handleChange.bind(this, "filter")}
          onSelect={this.handleSelect.bind(this)}
        />
      </div>
    );
  }
}

Form.defaultProps = {
  onChange: (value, field) => {},
  onCvvBlur: () => {},
  onCvvFocus: () => {},
  city: '',
  cities: [],
  cityId: -1
};

export default Form;
