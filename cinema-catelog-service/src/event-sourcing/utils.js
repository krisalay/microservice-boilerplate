'use strict';
const MongoClient = require('mongodb').MongoClient;
const state = require('./state');
const reduce = require('./reducers');

module.exports = {
	rebuildCinemaSessionsFromEvents
};

async function rebuildCinemaSessionsFromEvents(state,lastEventStamp) {
	console.log('............. Rebuilding state.')
	let url = 'mongodb://127.0.0.1:27017/eventorder-dev';
	let db = await MongoClient.connect(url);
	let eventCursor;
	if(lastEventStamp){
		eventCursor = db.collection('events').find({timestamp:{$gt:lastEventStamp}});
	}else{
		eventCursor = db.collection('events').find();
	}

	while(await eventCursor.hasNext()) {
		try {
			let event = await eventCursor.next();
			state.cinemaSession = await reduce(state.cinemaSession, event);
		} catch(err) {
			throw Error(err);
		}
	}
	console.log('CinemaSession', state.cinemaSession);

	eventCursor.close();
	db.close();
}
