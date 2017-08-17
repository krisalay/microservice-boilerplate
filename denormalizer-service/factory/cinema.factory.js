import { MongoClient } from 'mongodb';

class CinemaEventHandler {
  constructor(eventInfo) {
    this.eventInfo = eventInfo;
    this[eventInfo.type]();
  }

  async add() {
    let db, events;
    try {
      let url = 'mongodb://127.0.0.1:27017/msb-cinema-catelog';
      db = await MongoClient.connect(url);
      events = db.collection('cinema');
      console.log(this.eventInfo.data);
      await events.insert(this.eventInfo.data);
    } catch(err) {
      res.status = 500;
      res.json(err);
      return;
    } finally {
      if(db) db.close();
    }
  }

}

export default CinemaEventHandler;
