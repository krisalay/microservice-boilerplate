import Q from "q";
import _ from "lodash";

import ClientManager from "../OAuthClientManager";

function rejectionHandler(error) {
  if (error.name === 'OpenIdConnectError') {
    return error;
  }

  throw error;
}

export default class UserService {
  static renderUser(req, res, next) {
    UserService.checkToken(req.session, res);

    const tokens = req.session.token;
    const client = ClientManager.getById(req.session.client_id);

    console.log(tokens);
    client.userinfo(tokens.access_token).then(data => {
      console.log(data); console.log("success");
      res.json(data);
    }).catch(err => {
      console.log(err); console.log("failed");
      res.json(err);
    })

  }

  static checkToken(session, res) {
    if (!session.token || !session.token.access_token) {
      res.redirect('/login');
      next();
    }
  }
} 