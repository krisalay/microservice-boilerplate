import CinemaEventHandler from './cinema.factory';

class Factory {
  constructor(eventInfo){
    this.eventInfo = eventInfo;
    switch(this.eventInfo.service) {
      case "cinema" :
        this.handler = new CinemaEventHandler(this.eventInfo);
        break;
    }
  }
}
export default Factory;
