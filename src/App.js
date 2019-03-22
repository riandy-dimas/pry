import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';

import Form from './component/form'

class App extends Component {
  constructor () {
    super()
    this.state = {
      city: '',
      cityId: -1,
      cities: [],
      filter: ''
    }
    const timeout = 500

    this._getCitiesByName = _.debounce(this.getCitiesByName, timeout)
  }

  componentDidMount () {
    this.getAllCity()
  }

  handleChange(value, field) {
    this.setState({
      [field]: value
    })
    switch (field) {
      case 'city':
        this._getCitiesByName(value)
        break
      case 'cityId':
        this.setState({
          city: this.getLabelFromValue(this.state.cities, value)
        })
        break
      default: break
    }
  }

  getLabelFromValue (items = [], value) {
    const item = items.find((it) => it.value === value)
    return typeof item !== "undefined" ? item.label : ""
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

  getAllCity () {
    const PRAY_TIME_URL = 'https://api.banghasan.com/sholat/format/json/kota'
    fetch(PRAY_TIME_URL)
    .then(result => {
      if (result.status === 200) {
        return result.json()
      }
    })
    .then(resultJson => {
      let cities = []
      if (resultJson.kota && resultJson.kota.length > 0) {
        cities = resultJson.kota.map(k => {
          return {label: k.nama, value: k.id}
        })
      }
      this.setState({ cities })
    })
  }

  getCitiesByName (cityName = '') {
    console.log('GET_CITY_ID', cityName)
    const CITY_BY_NAME_URL = 'https://api.banghasan.com/sholat/format/json/kota/nama/' + cityName
    fetch(CITY_BY_NAME_URL)
    .then(result => {
      if (result.status === 200) {
        return result.json()
      }
    })
    .then(resultJson => {
      let cities = []
      if (resultJson.kota && resultJson.kota.length > 0) {
        cities = resultJson.kota.map(k => {
          return {label: k.nama, value: k.id}
        })
      }
      this.setState({ cities })
    })
  }

  render() {
    const {
      city,
      cities,
      cityId,
      filter
    } = this.state
    return (
      <div className="App">
        <Form 
          onChange={this.handleChange.bind(this)}
          city={city}
          cities={cities}
          cityId={cityId}
          filter={filter}
        />
      </div>
    );
  }
}

export default App;
