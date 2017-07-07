const state = require('./app.state')
const sockets = require('./sockets')

module.exports = function (socketUser, enabled) {
  state.direct = enabled
  sockets.all('direct', enabled)
}
