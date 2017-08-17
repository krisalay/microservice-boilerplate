import { MongoClient } from 'mongodb';

async function fetchCinema(req,res,next) {
  let db, events;
  let resultData;
  try {
    let url = 'mongodb://127.0.0.1:27017/msb-cinema-catelog';
    db = await MongoClient.connect(url);
    events = db.collection('cinema');
    resultData = await events.find().toArray();
  } catch(err) {
    res.status = 500;
    res.json(err);
    return;
  } finally {
    if(db) db.close();
  }
  res.json({success: true, message:resultData});
}

module.exports = fetchCinema;
