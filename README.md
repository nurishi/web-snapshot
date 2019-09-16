# What is it?
Express.js server that can take a screenshot of any website provided as url parameter and return the captured image as base64 strings or Buffer data. Internally uses Puppeteer to capture a website and Sharp to resize.

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

| Parameter Name | Description                                   | Default |
| -------------- | --------------------------------------------- | ------- |
| url            | The url of the website you want to capture    | null    |
| type           | image format (jpeg or png)                    | jpeg    |
| vw             | viewport width to be passed to Puppeteer      | 800     |
| vh             | viewport height to be passed to Puppeteer     | 600     |
| w              | output width after resize (need resize=true)  | 400     |
| h              | output height after resize (need resize=true) | 300     |
| resize         | resize image using sharp library              | false   |
| output         | json / base64 / binary                        | json    |

### Sample usage in the client app (output=json)

```javascript
const response = await fetch("http://localhost:3000/?url=https://google.com");
const data = JSON.parse(response);
```

## How to handle the response data?

| output | Response JSON data                  | Content-Type            | Description                                          |
| ------ | ----------------------------------- | ----------------------- | ---------------------------------------------------- |
| json   | { "image": "" }                     | application/json        | When failed to capture or url is missing             |
| json   | { "image": "DATAURI_STRINGS_HERE" } | application/json        | dataURI base64 strings wrapped in JSON               |
| base64 | (empty)                             | text/plain              | When failed to capture or url is missing             |
| base64 | BASE64_STRINGS_HERE                 | text/plain              | Raw dataURI base64 strings                           |
| binary | (empty)                             | image/jpeg or image/png | When failed to capture or url is missing             |
| binary | (Buffer data)                       | image/jpeg or image/png | Buffer data with Content-Type set to image mime type |

### Sample usage in the client app (output=json)

```html
<img src={data.image} />
```

# Deploy to Heroku

Note the following buildpackes are used.

| Buildpack                  | Description                             |
| -------------------------- | --------------------------------------- |
| Heroku/nodejs              | Node.js                                 |
| puppeteer-heroku-buildpack | To use puppeteer with CJK fonts enabled |

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


