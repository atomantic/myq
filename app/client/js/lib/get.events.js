var _ = require('lodash');
var getCalendars = require('./get.calendars');
var getCalendarEvents = require('./get.calendar.events');
var parallel = require('async/parallel');
module.exports = function(cb){
  if(!app.calendarList.length){
    getCalendars(load);
  }else{
    load();
  }
  function load(){
    var activeCalendars = _.filter(app.calendarList, (o)=>{ return _.indexOf(app.config.ignore, o.id)===-1});
    parallel(activeCalendars.map(getCalendarEvents), function(err/*, data*/) {
      app.events = _.orderBy(app.events, (o)=>{
        return new Date(o.start.dateTime||o.start.date);
      }, 'asc');
      // console.log('events fetched', err, app.events);
      if(cb){
        cb(app.events)
      }
    });
  }
};
