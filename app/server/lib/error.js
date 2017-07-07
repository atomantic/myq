const sockets = require('./sockets')
const state = require('./app.state')
module.exports = function(err){
  state.error = err
  sockets.all('error', err)
  throw err
}
