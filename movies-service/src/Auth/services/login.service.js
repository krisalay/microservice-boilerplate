import crypto from "crypto";

import ClientManager from "../OAuthClientManager";

export default class LoginService {
  static renderLogin(req, res, next) {
    req.session.state = crypto.randomBytes(16).toString('hex');
    req.session.nonce = crypto.randomBytes(16).toString('hex');
    console.log(req.protocol + "://" + req.get("host") + "/cb");
    let client = ClientManager.getById(req.session.client_id);
    const authorizationRequest = {
      claims: {
        id_token: { email_verified: null, role: null },
        userinfo: { sub: null, email: null, role: null },
      },
      redirect_uri: req.protocol + "://" + req.get("host") + "/cb",
      scope: "openid phone offline_access",
      state: req.session.state,
      nonce: req.session.nonce,
      prompt: "consent"
    };

    const authz = client.authorizationUrl(authorizationRequest);

    res.redirect(authz);
    next();
  }

  static authorizationCallback(req, res, next) {
    const state = req.session.state;
    delete req.session.state;
    const nonce = req.session.nonce;
    delete req.session.nonce;
    let client = ClientManager.getById(req.session.client_id);
    const params = client.callbackParams(req);
    client.authorizationCallback(req.protocol + "://" + req.get("host") + "/cb", params, { nonce, state }).then((token) => {
      req.session.token = token;
      req.session.loggedIn = true;
      res.redirect('/user');
      next();
    });
  }

  static refreshToken(req, res, next) {
    let client = ClientManager.getById(req.session.client_id);
    let tokens = req.session.token;
    console.log("Tokens");
    console.log(JSON.stringify(tokens, null, 4));
    client.refresh(tokens.refresh_token).then(data => {
      console.log(JSON.stringify(data, null, 4));
      req.session.token = data;
      res.json(data);
      next();
    }).catch(err => {
      console.log(err);
      res.json(err);
    })
  }
} 