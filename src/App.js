import React, { Component } from 'react';
import './App.css';

import Form from './component/form'

class App extends Component {
  constructor () {
    super()
    this.state = {
      city: ''
    }
  }

  handleChange(value, field) {
    this.setState({
      [field]: value
    })
  }

  render() {
    const {
      city
    } = this.state
    return (
      <div className="App">
        <Form 
          onChange={this.handleChange.bind(this)}
          city={city}
        />
      </div>
    );
  }
}

export default App;
