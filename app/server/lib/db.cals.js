const low = require('lowdb')

module.exports = low(
  __dirname+'/../data/db.cals.json', {
    storage: require('lowdb/lib/storages/file-async')
  }
)
