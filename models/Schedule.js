var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  time: { type: String },
  endtime: { type: String },
  url: { type: String }
});

var scheduleSchema = new mongoose.Schema({
  day: { type: String, unique: true },
  events: [eventSchema]
});

var Schedule = mongoose.model('Schedule', scheduleSchema);

exports.getSchedule = function(cb) {
  Schedule.find({}, function (err, sched) {
    if (err) {
      console.log(err);
      cb(err);
      return
    }
    cb(null, sched);
  });
}

exports.addEvent = function(dayname, evnt, cb) {
  Schedule.find({day:dayname}, function(err, day) {
    console.log(day);
    if (err || !day.day) {
      var schedule = new Schedule({
        day: dayname,
        events: [evnt],
      });
      schedule.save(function(err, sched) {
        if (err) {
          cb(err);
          console.log(err);
          return;
        }
        cb(null, sched);
      });
    } else {
      schedule.events.push(evnt);
    
      schedule.save(function(err, sched) {
        if (err) {
          cb(err);
          console.log(err);
          return;
        }
        cb(null, sched);
      });
    }
  });
}