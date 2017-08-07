import nconf from "nconf";

import { Issuer } from "openid-client";
import { authClient } from "./config";
import ClientManager from "./OAuthClientManager";

let issuer = {};

class OIDCProvider {
  static setup() {
    const ISSUER = nconf.get('authEndPoint') || 'localhost:3000';
    console.log(ISSUER);
    return Issuer.discover(ISSUER).then((i) => {
      issuer = i;
      ClientManager.add(authClient);
      return issuer;
    }).catch((e) => {
      console.log(e);
    });
  }

  static get issuer() {
    return issuer;
  }
}
module.exports = OIDCProvider;
