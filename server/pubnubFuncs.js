// /*eslint-disable camelcase*/
//
// const PubNub = require('pubnub')
// const { PUBLISH_KEY, SUBSCRIBE_KEY } = require('./secrets')
//
// const pubnub = PubNub.init({
//   subscribe_key: SUBSCRIBE_KEY,
//   publish_key: PUBLISH_KEY
// })
//
// /*eslint-enable camelcase*/
//
// const changeColor = (color, value) => {
//   pubnub.publish({
//     channel: 'smart-led',
//     message: { color: color, brightness: value }
//   })
// }
//
// module.exports = changeColor
