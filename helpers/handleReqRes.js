/**
 * Title: Handle Req and Res
 * Description: A helper file for handle request and response
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

// Dependencies

const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {
  notFoundHandler,
} = require('../handlers/routeHandlers/notFoundHandler');
const { parseJson } = require('./utilities');

// eslint-disable-next-line spaced-comment
//Module Scaffolding
const handle = {};

handle.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const query = parsedUrl.query;
  const headers = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    query,
    headers,
  };

  const decode = new StringDecoder('utf-8');
  let storeData = '';

  req.on('data', (buffer) => {
    storeData += decode.write(buffer);
  });

  req.on('end', () => {
    storeData += decode.end();

    requestProperties.body = parseJson(storeData);

    const chosenHandler = routes[trimmedPath]
      ? routes[trimmedPath]
      : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const stringifyPayload = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(stringifyPayload);
    });
  });
};

//export module
module.exports = handle;
