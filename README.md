# What is it?
Express.js server that can take a screenshot of any website provided as url parameter and return the captured image as base64 strings data, not as a static file.

# Usage

## How to start the server?

```bash
yarn start
```
or
```bash
npm start
```

## How to make a request to the server?

### Query Parameter

| Parameter Name | Description                                |
| -------------- | ------------------------------------------ |
| url            | The url of the website you want to capture |

### Sample usage in the client app

```javascript
const response = await fetch("http://localhost:3000/?url=https://google.com");
const data = JSON.parse(response);
```

## How to handle the response data?

| Response JSON data                 | Description                         |
| ---------------------------------- | ----------------------------------- |
| { "image": "" }                    | failed to capture or url is missing |
| { "image": "BASE64_STRINGS_HERE" } | PNG format image in base64 strings  |

### Sample usage in the client app

```html
<img src={`data:image/png;base64,${data.image}`} />
```

# Deploy to Heroku

Note the following buildpackes are used.

| Buildpack                  | Description                             |
| -------------------------- | --------------------------------------- |
| Heroku/nodejs              | Node.js                                 |
| puppeteer-heroku-buildpack | To use puppeteer with CJK fonts enabled |

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


