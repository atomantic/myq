const low = require('lowdb')

module.exports = low(
  __dirname+'/../data/db.config.json', {
    storage: require('lowdb/lib/storages/file-async')
  }
).get('config')
