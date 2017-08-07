import nconf from "nconf";

import { Issuer } from "openid-client";
import { authClient } from "./config";

let issuer = {};

class OIDCProvider {
  static setup() {
    const ISSUER = nconf.get('authEndPoint') || 'localhost:3000';
    console.log(ISSUER);
    return Issuer.discover(ISSUER).then((i) => {
      ClientManager.add(authClient);
      return issuer = i;
    }).catch((e) => {
      console.log(e);
    });
  }

  static get issuer() {
    return issuer;
  }
}
module.exports = OIDCProvider;
