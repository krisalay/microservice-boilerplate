import _ from "lodash";
import OIDCProvider from "./setup";
let clients = [];

export default class ClientManager {
  constructor() {
  }

  static getById(client_id) {
    let clientIndex = _.findIndex(clients, ["client_id", client_id]);
    return clients[clientIndex];
  }

  static add(client) {
    let c = new OIDCProvider.issuer.Client(client);
    clients.push(c);
  }

  static delete(client) {
    // TODO delete a given client
  }

  static update(client) {
    // TODO update client with new data
  }
}