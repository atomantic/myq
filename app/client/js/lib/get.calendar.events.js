var _ = require('lodash');
module.exports = function(cal){
  return function(cb){
    gapi.client.calendar.events.list({
      'calendarId': cal.id,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      app.events = app.events.concat(response.result.items.map(function(o){
        o.bgColor = cal.backgroundColor;
        o.fgColor = cal.foregroundColor;
        o.colorId = cal.colorId;
        o.calId = cal.id;
        return o;
      }));
      app.events = _.orderBy(app.events, (o)=>{
        return new Date(o.start.dateTime||o.start.date);
      }, 'asc');
      cal.eventsLoaded = true;
      if(cb){
        cb();
      }
    });
  };
}
