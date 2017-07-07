var _ = require('lodash');
module.exports = function(callback){
  // make sure we have a "MyQ" calendar
  app.myqCalendar = _.filter(app.calendarList, {summary: 'MyQ'})[0];
  // if not, create one
  if(!app.myqCalendar){
    gapi.client.calendar.calendars.insert({
      summary: 'MyQ',
      description: 'The MyQ Calendar holds ToDo items created in MyQ and it stores preferences for MyQ in a single (ancient) event.'
    }).then(function(response){
      app.myqCalendar = response.result;
      console.log('MyQ calendar created', response);
      if(callback){
        callback();
      }
    })
  }
};
