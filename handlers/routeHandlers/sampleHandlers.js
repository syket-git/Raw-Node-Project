/**
 * Title: Sample handler
 * Description: A handler method to handling sampler handler
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: 'this is a sample page',
  });
};

module.exports = handler;
