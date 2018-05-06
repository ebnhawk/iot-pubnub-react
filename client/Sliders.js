import React, { Component } from 'react'
import PubNubReact from 'pubnub-react'
import { PUBLISH_KEY, SUBSCRIBE_KEY } from './secrets'

export default class Sliders extends Component {
  constructor() {
    super()
    this.state = { red: 0, green: 0, blue: 0 }
    this.handleChange = this.handleChange.bind(this)
    this.pubnub = new PubNubReact({
      publishKey: PUBLISH_KEY,
      subscribeKey: SUBSCRIBE_KEY
    })
    this.pubnub.init(this)
  }

  componentWillMount() {
    this.pubnub.subscribe({
      channels: ['smart-led'],
      withPresence: true
    })
    this.pubnub.getMessage('smart-led', msg => {
      console.log(msg)
    })
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['smart-led']
    })
  }

  handleChange(event) {
    const color = event.target.name
    const value = event.target.value
    this.setState({
      [color]: value
    })
    this.pubnub.publish({
      channel: 'smart-led',
      message: { color: color, brightness: value }
    })
  }

  render() {
    return (
      <form>
        <label htmlFor="red">
          <h3>Red</h3>
        </label>
        <input
          type="range"
          name="red"
          min="0"
          max="255"
          step="1"
          value={this.state.red}
          onChange={this.handleChange}
        />

        <label htmlFor="green">
          <h3>Green</h3>
        </label>
        <input
          type="range"
          name="green"
          min="0"
          max="255"
          step="1"
          value={this.state.green}
          onChange={this.handleChange}
        />

        <label htmlFor="blue">
          <h3>Blue</h3>
        </label>
        <input
          type="range"
          name="blue"
          min="0"
          max="255"
          step="1"
          value={this.state.blue}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
