module.exports = function(){
    gapi.client.calendar.events.update({
      calendarId: app.myqCalendar.id,
      eventId: app.configEvent.id,
      description: JSON.stringify(app.config),
      start: {
        date: '2017-01-01'
      },
      end: {
        date: '2017-01-01'
      }
    }).then(function(response){
      console.log('config saved', response);
    })
};
