'use strict';
const CinemaSession = require('../aggregate');
const { EVT_ADDED_CINEMA } = require('./names');

//Exports
module.exports = addedCinemaEventBuilder;

async function addedCinemaEventBuilder(cinemaSessions, data) {
	let cinemaSession;

	try {
		cinemaSession = await CinemaSession.open(data);
		console.log(cinemaSession);
	} catch(err) {
		throw err;
	}

	return {
		type: EVT_ADDED_CINEMA,
		service: 'cinema',
		timestamp: Date.now(),
		data: cinemaSession
	};
}
