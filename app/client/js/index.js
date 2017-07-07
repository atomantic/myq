var Vue = require('vue/dist/vue.js');
var lib = require('./lib/index.js');
var grid = require('./components/grid.js');
var eventItem = require('./components/event-item.js');
var timeList = require('./components/time-list.js');
var eventList = require('./components/event-list.js');
var getCalendarEvents = require('./lib/get.calendar.events.js');
var _ = require('lodash');
// var storage = require('./lib/storage');

window.app = new Vue({
  // We want to target the div with an id of 'events'
  el: '#app',
  // Here we can register any values or collections that hold data
  // for the application
  data: {
    calendarList: [],
    calendarListExpanded: false,
    cals: {},
    config: {
      ignore:[]
    },
    configLoaded: false,
    connected: false,
    error: false,
    events: [],
    isLoaded: false,
    isSignedIn: false,
    queue: [],
    query: '',
    running: false,
    time: [],
    searchCalendars: '',
    searchEvents: []
  },
  // Anything within the ready function will run when the application loads
  ready: function() {
  },
  // Methods we want to use in our application are registered here
  methods: {
    add: function(){},
    googleAuth: lib.signIn,
    googleDeAuth: lib.signOut,
    init: lib.init,
    search: function(e){
     e.preventDefault();
     this.query = document.querySelector('#query').value;
     this.running = true;
     console.log('search', this.query);
     gapi.client.calendar.events.list({
       'calendarId': 'primary',
       'timeMin': (new Date()).toISOString(),
       'showDeleted': false,
       'singleEvents': true,
       'maxResults': 100,
       'orderBy': 'startTime'
     }).then(function(response) {
       app.searchEvents = response.result.items;
     });
    }
  },
  watch: {
    config: {
      handler: function (config) {
        // ignore the initial config population from user's saved state
        if(!this.configLoaded){
          this.configLoaded = true;
          return;
        }
        _.forEach(config.ignore, function(id){
          // filter events based on ignores
          var cal = _.filter(app.calendarList, {id: id})[0];
          if(cal.eventsLoaded){
            // we have loaded events, pull them from the events list
            console.log('removing events for', cal.summary);
            app.events = app.events.filter(item => item.calId!==id);
            cal.eventsLoaded = false;
          }
        });
        _.forEach(app.calendarList, function(cal){
          if(_.indexOf(config.ignore, cal.id)==-1 && !cal.eventsLoaded){
            console.log('events need to be loaded for', cal.summary);
            getCalendarEvents(cal)()
          }
        })
        console.log('config changed: saving');
        lib.saveConfig();
      },
      deep: true
    }
  }
});
Vue.component('modal', {
  template: '#modal-template'
});
Vue.component('event-list', eventList);
Vue.component('event-item', eventItem);
Vue.component('time-list', timeList);

var calendarGrid =  _.merge(_.cloneDeep(grid), {
  props: {
    config: Object
  },
  methods: {
    expandToggle: function(item){
      item.expanded = !item.expanded;
      console.log('expandToggle', item)
    },
    setIgnore: function(entry, ignore){
      if(ignore){
        console.log('ignoring', entry);
        app.config.ignore.push(entry.id);
      }else{
        console.log('un-ignoring', entry);
        app.config.ignore = app.config.ignore.filter(item => entry.id!==item);
        // _.pull(app.config.ignore, entry.id);
        // Vue.set(app.config, 'ignore', app.config.ignore);
      }
    }
  }
});
Vue.component('calendar-grid', calendarGrid);
