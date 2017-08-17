function open(data) {
	console.log('inside open..........', data);
	return {
		cinemaName: data.name || "Test cinema",
		time: new Date()
	}
}

module.exports = {
	open
};
