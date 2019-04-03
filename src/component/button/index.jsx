import React, { PureComponent } from 'react'
import './styles.scss'

class Button extends PureComponent {
  render () {
    const {
      text,
      disabled,
      onClick,
      small
    } = this.props
    return (
      <div className={`button${disabled ? ' button-disabled' : ''}${small ? ' button-small' : ''}`} onClick={onClick.bind(this)}>
        { text }
      </div>
    )
  }
}

Button.defaultProps = {
  text: 'Submit',
  disabled: false,
  small: false,
  onClick: () => {}
}

export default Button