'use strict'
// const _ = require('lodash')
const Hapi = require('hapi')
const pjson = require('../package')
const server = new Hapi.Server()
const sockets = require('./lib/sockets')
require('./lib/process')(server)

server.connection({ port: 4112 })

const io = sockets.init(server.listener)
io.on('connection', require('./lib/io.on.connect'))

// Register the plugin with custom config
server.register(
  [
    require('inert'),
    require('scooter'),
    {
        register: require('blankie'),
        options: {
          "connectSrc": "'self' *",
          "generateNonces": false,
          "fontSrc": "'self'",
          "imgSrc": "'self' *",
          "frameSrc": "'self' accounts.google.com content.googleapis.com",
          "scriptSrc": "'self' 'unsafe-inline' 'unsafe-eval' secure.aadcdn.microsoftonline-p.com apis.google.com",
          "styleSrc": "'self' 'unsafe-inline'"
        }
    },
    {
      register: require("hapi-and-healthy"),
      options: {
        env: process.env.APP_ENV,
        name: pjson.name,
        version: pjson.version
      }
    }
  ],
  function (err){
    if(err) throw err

    server.route({
        config: {
          cors: true
        },
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: __dirname+'/../public'
            }
        }
    })
  }
)

// Start the server
server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})
