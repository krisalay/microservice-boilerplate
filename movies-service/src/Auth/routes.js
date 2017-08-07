import express from "express";

import LoginService from "./services/login.service";
import UserService from "./services/user.service";
import OIDCProvider from "./setup";

const app = express();

OIDCProvider.setup();

app.use((req, res, next) => {
  console.log(`In middleware`);
  next();
});

app.get(`/login`, (req, res, next) => {
  LoginService.renderLogin(req, res, next);
});

app.get('/refresh', (req, res, next) => {
  LoginService.refreshToken(req, res, next);
});

app.get('/cb', (req, res, next) => {
  LoginService.authorizationCallback(req, res, next);
});

app.get('/user', (req, res, next) => {
  UserService.renderUser(req, res, next);
});

module.exports = {
  router: app
}