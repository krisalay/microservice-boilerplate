// // const eventstore = require('eventstore');
import servicebus from 'servicebus';
let bus = servicebus.bus({
  url: "amqp://localhost:5672"
});
var es = require('eventstore')({
  type: 'mongodb',
  host: 'localhost',                          // optional
  port: 27017,                                // optional
  dbName: 'eventstore',                       // optional
  eventsCollectionName: 'events',             // optional
  snapshotsCollectionName: 'snapshots',       // optional
  transactionsCollectionName: 'transactions', // optional
  timeout: 10000                              // optional
  // maxSnapshotsCount: 3                        // optional, defaultly will keep all snapshots
  // authSource: 'authedicationDatabase',        // optional
  // username: 'technicalDbUser',                // optional
  // password: 'secret'                          // optional
  // url: 'mongodb://user:pass@host:port/db?opts // optional
});

// const es = eventstore();

es.useEventPublisher(function(evt){
  console.log('HIIIIIIIIIIIIIIIIII');
  bus.publish('broadcast', {
    command: "heartbeat"
  });
})

es.on('connect', function(){
  console.log('event storage connected');
});

es.on('disconnect', function(){
  console.log('connection to event storage is lost');
});

es.defineEventMappings({
  id: 'id',
  commitId: 'commitId',
  commitSequence: 'commitSequence',
  commitStamp: 'commitStamp',
  streamRevision: 'streamRevision'
});


es.init();


es.getEventStream('streamId', function(err, stream) {
  var history = stream.events; // the original event will be in events[i].payload

  // myAggregate.loadFromHistory(history);
});
