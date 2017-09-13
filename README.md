<<<<<<< HEAD
# Microservice Boilerplate

This project contains the folder structure and boilerplate for microservice architecture

## Authentication for microservices

Instead of each microservice handling authentication, we are using Open ID.

#### Setup
For Open Id, we need to create a connected App with the provider. To create a connected app, use the following command

```
  Verb: POST
  URL: authServerURL/reg
  Request Body: {
    "redirect_uris": [list of callback urls],
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "scope": "openid phone offline_access"
  }
```

## Adding configurations
All the configuration/ environment variables should not be directly used in the code. They should be added `config.json` file in `env` folder.

This `env` folder contains folders for different environments like `dev`/`production` etc. Each folder has its own `config.json` file.

After adding this content, you need to configure nconf to take from these files by adding following code

```
import nconf from "nconf";
nconf.argv().env().file({ 
  file: `path/to/env/${process.env.NODE_ENV}/config.json` 
});
```

Now to access any of the environment variables, just use 
`nconf.get("keyName")`
=======
# microservice-boilerplate
This repository is a boilerplate for the microservice architecture using Nodejs.
>>>>>>> dd4f299a0b11cbe6121b116fb1a9fadce36ca755
