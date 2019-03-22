import React, { PureComponent } from 'react'
import './styles.scss'

class Select extends PureComponent {
  handleSelect (value) {
    this.props.onSelect(value)
  }
  render () {
    const {
      items,
      label,
      onChange,
      valueLabel,
      filter
    } = this.props
    return (
      <div className="select">
        <div className="select--label">
          { label }
        </div>
        <div className="select--valueLabel">
          { valueLabel }
        </div>
        <div className="select--dropdown">
          <input type="text" onChange={onChange.bind(this)} value={filter}/>
          {
            items
            .filter(item => item.label.toLowerCase().indexOf(filter.toLowerCase()) > -1)
            .map((item, i) => {
              const {
                label,
                value
              } = item
              return (
                <div key={i} className="select--list" onClick={this.handleSelect.bind(this, value)}>
                  { label }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Select.defaultProps = {
  items: [],
  onSelect: () => {},
  onChange: () => {}
}

export default Select