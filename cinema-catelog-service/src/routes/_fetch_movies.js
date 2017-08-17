import { MongoClient } from 'mongodb';
import fetchMovies from '../grpc-communication/client';

async function fetchMoviesByCinemaId(req,res,next) {
  fetchMovies();
  res.json(req.params);
  // fetchMovies();
  // let db, events;
  // let resultData;
  // try {
  //   let url = 'mongodb://127.0.0.1:27017/msb-cinema-catelog';
  //   db = await MongoClient.connect(url);
  //   events = db.collection('cinema');
  //   resultData = await events.find().toArray();
  // } catch(err) {
  //   res.status = 500;
  //   res.json(err);
  //   return;
  // } finally {
  //   if(db) db.close();
  // }
  // res.json({success: true, message:resultData});
}

module.exports = fetchMoviesByCinemaId;
