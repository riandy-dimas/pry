import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';

import Form from './component/form'

class App extends Component {
  constructor () {
    super()
    this.state = {
      city: ''
    }
    const timeout = 500

    this._getPrayData = _.debounce(this.getPrayData, timeout)
  }

  handleChange(value, field) {
    this.setState({
      [field]: value
    })
    switch (field) {
      case 'city':
        this._getPrayData(value)
        break
      default: break
    }
  }

  getPrayData (city = '') {
    console.log('GET_DATA', city)
    const PRAY_TIME_URL = 'https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/2019-03-21'
    fetch(PRAY_TIME_URL)
    .then(result => {
      if (result.status === 200) {
        return result.json()
      }
    })
    .then(resultJson => {
      console.log('RESULT', { resultJson })
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
