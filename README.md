# iban-service

The application consumes a string and returns its validity as an IBAN number

Deployed on Heroku at: https://iban-service.herokuapp.com

## Docs
The Open API 3 docs will be available on `/docs` route. Read the hosted docs [here](https://iban-service.herokuapp.com/docs).

## Examples

```sh
curl -X 'GET' \
  'https://iban-service.herokuapp.com/verify?iban=GB82WEST12345698765432' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
The response should be `{"result":"valid"}`

```sh
curl -X 'GET' \
  'https://iban-service.herokuapp.com/verify?iban=GB82WEST12345698765431' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
The response should be `{"result":"invalid","reason":"Check digits are errornous"}`

## Clarifications
- The application is in Node.js because it is my primary language.
- The countries supported are the ones defined in [the spec file](./services/countryRules/spec.js). More countries can be added trivially.

## Resources
1. [Wikipedia article on 'IBAN'](https://en.wikipedia.org/wiki/International_Bank_Account_Number)
2. [IBAN registry](https://www.iban.com/files/iban_registry.pdf)

## System requirements
Unless the application is run with docker, the system needs to have `node.js` v14 and `npm` v7.

## Install deps
`npm i` or `make build`

## Run tests
`npm t` will run the tests using `tap`. You can also run `make test`.

## Run the server
`npm run dev` or `make run` runs the server in dev mode using nodemon. It should just work.

`npm start` is more proper way to start the application.

The `/verify` route is behind basic authorization. Default username/password is `dev:dev`.

## Envs
|env|default|
|---|-------|
|PORT|3000|
|NODE_ENV|local|
|BASIC_AUTH_USERNAME|dev|
|BASIC_AUTH_PASSWORD|dev|
