const five = require('johnny-five')
let led

five.Board().on('ready', () => {
  console.log('Ready...')

  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  })

  led.color({ red: 0, blue: 255, green: 255 })
  led.on()
})
