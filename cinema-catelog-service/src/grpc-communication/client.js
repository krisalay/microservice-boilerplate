const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../../../grpc-proto');
const proto = grpc.load({root: protoPath, file: 'cinema.proto' });
const client = new proto.cinema_catelog.CinemaService('localhost:50051', grpc.credentials.createInsecure());

function fetchMovies() {
  client.fetchMovies({cinema_id: 1}, (error, response) => {
    if (!error) {
      console.log(response);
    } else {
      console.log("Error:", error.message);
    }
  });
}

module.exports = fetchMovies;
