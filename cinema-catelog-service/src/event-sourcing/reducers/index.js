import CinemaSession from '../aggregate';
import { EVT_ADDED_CINEMA } from '../events/names';

const reduce = {
  [EVT_ADDED_CINEMA] : evtAddedCinema
};

module.exports = async function (cinemaSessions, event) {
  let { type, data } = event;
  if(reduce[type]) {
    return await reduce[type](cinemaSessions, data);
  }
  return cinemaSessions;
}

async function evtAddedCinema(cinemaSessions, data) {
  let cinemaSession;
  try {
    cinemaSession = await CinemaSession.open(data);
  } catch(err) {
    return cinemaSessions;
  }
  return [
    ...cinemaSessions,
    cinemaSession
  ];
}
