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
      filter: '',
      loading: false
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

  doLoading () {
    this.setState({
      loading: true
    })
  }

  doneLoading () {
    this.setState({
      loading: false
    })
  }

  getAllCity () {
    const PRAY_TIME_URL = 'https://api.banghasan.com/sholat/format/json/kota'
    this.doLoading()
    fetch(PRAY_TIME_URL)
    .then(result => {
      this.doneLoading()
      if (result.status === 200) {
        return result.json()
      }
    })
    .then(resultJson => {
      let cities = []
      if (resultJson.kota && resultJson.kota.length > 0) {
        cities = resultJson.kota.map(k => {
          return {label: k.nama.toLowerCase(), value: k.id}
        })
      }
      this.setState({ cities })
    })
    // this.setState({
    //   cities: [
    //     {
    //       label: 'Kota Semarang',
    //       value: '123'
    //     },
    //     {
    //       label: 'Kota Salatiga',
    //       value: '456'
    //     },
    //     {
    //       label: 'Kota Depok',
    //       value: '124'
    //     },
    //     {
    //       label: 'Bangka',
    //       value: '231'
    //     },
    //     {
    //       label: 'Belitung',
    //       value: '532'
    //     },
    //     {
    //       label: 'Sabang',
    //       value: '573'
    //     }
    //   ]
    // })
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
          return {label: k.nama.toLowerCase(), value: k.id}
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
      filter,
      loading
    } = this.state
    return (
      <div className="App">
        <Form 
          onChange={this.handleChange.bind(this)}
          city={loading ? "Sedang memuat.." : city}
          cities={cities}
          cityId={cityId}
          filter={filter}
          loading={loading}
        />
      </div>
    );
  }
}

export default App;
