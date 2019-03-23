import React, { PureComponent } from "react";
import "./styles.scss";

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
    onChange('', "filter")
  }
  render() {
    const { city, cities, cityId, filter, loading } = this.props;
    return (
      <div className="form">
        <Select 
          items={cities}
          value={cityId}
          valueLabel={`${city}${cityId > -1 ? ` (${cityId})` : '' }`}
          filter={filter}
          label="Nama Kota"
          onChange={this.handleChange.bind(this, "filter")}
          onSelect={this.handleSelect.bind(this)}
          searchPlaceholder="Cari Kota..."
          disabled={loading}
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
