/*eslint-disable camelcase */

const { PUBLISH_KEY, SUBSCRIBE_KEY } = require('./secrets')
const PubNub = require('pubnub')
const pubnub = new PubNub({
  subscribe_key: SUBSCRIBE_KEY,
  publish_key: PUBLISH_KEY
})

/*eslint-enable camelcase */

const startLight = () => {
  const five = require('johnny-five')
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
    },
    presence: event => console.log('Presence: ', event)
  })

  pubnub.subscribe({
    channels: ['smart-led']
  })
}

module.exports = startLight
