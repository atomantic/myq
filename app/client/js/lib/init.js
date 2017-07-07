var getCalendars = require('./get.calendars');
var getConfig = require('./get.myq.config');
var getEvents = require('./get.events');
var createQueue = require('./queue');
module.exports = function(){
  gapi.load('client:auth2', function initClient() {
    gapi.client.init({
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: '1092305602973-ld7nf41rvl683ek6boahrur2ide8dtoh.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar'
    }).then(function () {
      app.isLoaded = true;
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle the initial sign-in state.
      updateSigninStatus()
      if(app.isSignedIn){
        getCalendars(function(){
          getConfig(function(){
            getEvents(function(events){
              createQueue(events);
            })
          });
        })
      }
    });
  });
  function updateSigninStatus(){
    app.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
  }
}
