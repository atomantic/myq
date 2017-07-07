var getMyQCalendar = require('./get.myq.calendar.js');
// var saveConfig = require('./save.config');
module.exports = function(callback){
  if(!app.myqCalendar){
    getMyQCalendar(loadConfig);
  }else{
    loadConfig();
  }
  function loadConfig(){
    // see if we have a myq config event
    gapi.client.calendar.events.list({
      'calendarId': app.myqCalendar.id,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 1,
      'orderBy': 'startTime'
    }).then(function(response) {
      if(!response.result.items.length){
        // no event
        // create the event that we will use to store our preferences
        return gapi.client.calendar.events.insert({
          calendarId: app.myqCalendar.id,
          text: 'config',
          description: JSON.stringify(app.config),
          start: {
            date: '2017-01-01'
          },
          end: {
            date: '2017-01-01'
          }
        }).then(function(response) {
          console.log('config saved', response);
        });
      }
      app.configEvent = response.result.items[0];
      if(app.configEvent.description){
        app.config = JSON.parse(app.configEvent.description);
      }
      // app.$watch('config', function (newVal, oldVal) {
      //   console.log('config changed: saving: ', newVal, oldVal);
      //   saveConfig();
      // })
      console.log('config', app.config);
      callback();
    });
  }
};
