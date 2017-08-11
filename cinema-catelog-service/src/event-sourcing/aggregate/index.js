function open(data) {
	console.log('inside open..........', data);
	return {
		userId: data.userId,
		time: new Date()
	}
}

module.exports = {
	open
};
