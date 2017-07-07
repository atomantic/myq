var _ = require('lodash');
module.exports = function(callback){
  gapi.client.calendar.calendarList.list().then(function(response) {
    // alphabetize and store in app data
    app.calendarList = _.sortBy(response.result.items, item => item.summaryOverride||item.summary);
    // console.log('calendars fetched', app.calendarList);
    // ensure we have a MyQ calendar
    require('./get.myq.calendar.js')();
    // answer the call:
    callback(app.calendarList);
  });
};
