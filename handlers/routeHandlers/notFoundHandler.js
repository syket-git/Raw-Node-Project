/**
 * Title: Not Found handler
 * Description: A handler method to handling Not found handler
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(404, {
    message: 'Not found the page',
  });
};

module.exports = handler;
