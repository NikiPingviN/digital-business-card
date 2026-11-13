'use strict';

function sendLoadError(response, error) {
  const message = error && error.stack ? error.stack : String(error);
  response.statusCode = 500;
  response.setHeader('content-type', 'text/plain; charset=utf-8');
  response.end(message);
}

let handler;

try {
  handler = require('../dist/vercel').default;
} catch (error) {
  handler = (_request, response) => {
    console.error(error);
    sendLoadError(response, error);
  };
}

module.exports = (request, response) => {
  try {
    return handler(request, response);
  } catch (error) {
    console.error(error);
    sendLoadError(response, error);
  }
};
