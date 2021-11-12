/**
 * Title: User handler
 * Description: A handler to handling user related data
 * Author: Syket Bhattachergee
 * Date: 11/12/2021
 */

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethod = ['get', 'post', 'put', 'delete'];

  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};

handler._users.get = (requestProperties, callback) => {};
handler._users.post = (requestProperties, callback) => {};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
