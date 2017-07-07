// const _ = require('lodash')
// const dbCals = require('./db.cals').get('cals')
const icals = require('./icals')
// todo: load custom tasks db and merge with ical events
module.exports = {
  data: [],
  assemble: function(callback){
    icals.load((err) => {
      console.log('icals loaded', err ? err : '😀')
      callback(err, icals.events)
    })
  }
}
