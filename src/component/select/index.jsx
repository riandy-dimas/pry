import React, { PureComponent } from 'react'
import './styles.scss'

class Select extends PureComponent {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      dropdown: false
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.toggleDropDown(false)
    }
  }

  toggleDropDown (value) {
    this.setState({
      dropdown: value
    })
  }

  handleSelect (value) {
    this.toggleDropDown(false)
    this.props.onSelect(value)
  }

  handleFocus () {
    this.toggleDropDown(true)

    // Make sure the component rendered before focusing
    setTimeout(() => {
      this.searchRef.focus()
    }, 100)
  }
  
  render () {
    const {
      items,
      label,
      onChange,
      valueLabel,
      filter,
      searchPlaceholder,
      disabled
    } = this.props
    const {
      dropdown
    } = this.state
    return (
      <div className={`select${disabled ? ' select-disabled' : ''}`}>
        <div className="select--label">
          { label }
        </div>
        <div className={`select--valueLabel${dropdown ? ' select--valueLabel-active' : ''}`} onClick={this.handleFocus.bind(this)}>
          { valueLabel !== "" ? valueLabel : <span className="select--placeholder">- Pilih Kota -</span> }
        </div>
        <div className={`select--dropdown${dropdown ? ' select--dropdown-active' : ''}`} ref={this.setWrapperRef}>
          <input type="text" className="select--searchBox" placeholder={searchPlaceholder} onChange={onChange.bind(this)} value={filter} ref={(input) => { this.searchRef = input }}/>
          <div className="select--items">
          {
            items
            .filter(item => item.label.toLowerCase().indexOf(filter.toLowerCase()) > -1)
            .map((item, i) => {
              const {
                label,
                value
              } = item
              return (
                <div key={i} className="select--item" onClick={this.handleSelect.bind(this, value)}>
                  { label }
                </div>
              )
            })
          }
          </div>
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