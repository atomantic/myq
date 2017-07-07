var _ = require('lodash');
var Moment = require('moment');
var MomentRange = require('moment-range');
var moment = MomentRange.extendMoment(Moment);
window.moment = moment;
/**
 *  builds the time-plan queue data model
 *  with empty time slots for time periods between tasks
**/
module.exports = function(events){
  var queue = {
    tags: _.filter(events, function(e){
      return e.start.date
    }),
    tasks: []
  };
  var tasks = _.filter(events, function(e){
    return e.start.dateTime;
  });

  // starting point for all tasks to reference position, etc
  var start = tasks[0].start.dateTime;
  var startTime = new Date(start);

  var lastEvent;
  _.each(tasks, function(ev){
    var startObj = new Date(ev.start.dateTime);
    if(lastEvent){
      var endObj = new Date(lastEvent.end.dateTime);
      // see if the end time for the last event + the start time for this event has a gap (window)
      // TODO: overlapping events using momentRange
      var gap =  startObj - endObj;
      if(gap){
        // create an empty window event
        queue.tasks.push({
          summary: 'free',
          colorId: 0,
          start: {
            dateTime: lastEvent.end.dateTime
          },
          end: {
            dateTime: ev.start.dateTime
          },
          // minutes from start
          placement: (endObj - startTime) / 60000
        })
        // console.log('free', lastEvent.end.dateTime, ev.start.dateTime)
      }
    }
    // minutes from start
    ev.placement = (startObj - startTime) / 60000
    lastEvent = ev;
    queue.tasks.push(ev);
  });
  app.queue = queue.tasks;
  console.log('queue', queue.tasks);


  // build time range
  // todo: shouldn't this be somewhere else?
  var end = queue.tasks[queue.tasks.length-1].end.dateTime;
  var endTime = new Date(end);
  // var timeMS = endTime - startTime;
  // var timeBlocks = timeMS/1000/60/15;
  // for(var i=0;i<timeBlocks;i++){
  //   app.time.push({
  //     time:
  //   })
  // }
  console.log(start, end)
  var range1 = moment.range(startTime, endTime);

  var acc = Array.from(range1.by('minute', { step: 15 }));

  app.time = acc.map(function(m) {
    return {
      time: m.format('HH:mm'),
      day: m.format('dddd')
    }
  })

  return queue;
}
