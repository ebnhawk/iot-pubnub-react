/*eslint-disable camelcase */

const PubNub = require('pubnub')
const pubnub = new PubNub({
  subscribe_key: process.env.SUBSCRIBE_KEY,
  publish_key: process.env.PUBLISH_KEY
})
const five = require('johnny-five')

/*eslint-enable camelcase */

const startLight = () => {
  let led
  let red = 0
  let green = 0
  let blue = 0

  five.Board().on('ready', () => {
    console.log('Arduino ready...')

    led = new five.Led.RGB({
      pins: {
        red: 6,
        green: 5,
        blue: 3
      }
    })
  })

  pubnub.addListener({
    status: event => console.log('Status: ', event),
    message: event => {
      const message = event.message
      if (led) {
        red = message.color === 'red' ? message.brightness : red
        green = message.color === 'green' ? message.brightness : green
        blue = message.color === 'blue' ? message.brightness : blue
        led.color({ red, green, blue })
      }
    }
  })

  pubnub.subscribe({
    channels: ['smart-led']
  })
}

module.exports = startLight
