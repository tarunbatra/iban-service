# iban-service

The application consumes a string and returns it's validity as an IBAN number

## Install deps
`npm i`

## Run tests
`npm t` will run the tests using `tap`.

## Run the server
`npm run dev` runs the server in dev mode using nodemon. It should just work.

`npm start` is more proper way to start the application.

The `/verify` route is behind basic authorization. Default username/password is `dev:dev`.

## Envs
|env|default|
|---|-------|
|PORT|3000|
|NODE_ENV|local|
|BASIC_AUTH_USERNAME|dev|
|BASIC_AUTH_PASSWORD|dev|

## Docs
The Open API 3 docs will be available on `/docs` route.

## Example

```sh
curl -X 'GET' \
  'http://0.0.0.0:3000/verify?iban=GB82WEST12345698765432' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
The response should be `{"result":"valid"}`

```sh
curl -X 'GET' \
  'http://0.0.0.0:3000/verify?iban=GB82WEST12345698765431' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
The response should be `{"result":"invalid","reason":"Check digits are errornous"}`