const state = require('./app.state')
module.exports = function (socketUser) {
  socketUser.emit('hello', {
    message: 'welcome',
    direct: state.direct
  })
}
