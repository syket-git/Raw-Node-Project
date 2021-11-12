/**
 * Title: User handler
 * Description: A handler to handling user related data
 * Author: Syket Bhattachergee
 * Date: 11/12/2021
 */

//Dependencies
const { hash } = require('../../helpers/utilities');
const data = require('../../lib/data');

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

handler._users.post = (requestProperties, callback) => {
  // Sanitizing the user requested data
  const firstName =
    typeof requestProperties.body.firstName === 'string' &&
    requestProperties.body.firstName.trim()?.length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === 'string' &&
    requestProperties.body.lastName.trim()?.length > 0
      ? requestProperties.body.lastName
      : false;
  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim()?.length === 11
      ? requestProperties.body.phone
      : false;
  const tosCondition =
    typeof requestProperties.body.tosCondition === 'boolean'
      ? requestProperties.body.tosCondition
      : false;

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password?.trim()?.length > 0
      ? requestProperties.body.password
      : false;

  if (firstName && lastName && phone && tosCondition && password) {
    // Check this users was created or not

    data.read('users', phone, (err) => {
      if (err) {
        const userObj = {
          firstName,
          lastName,
          phone,
          tosCondition,
          password: hash(password),
        };

        data.create('users', phone, userObj, (err1) => {
          if (err1) {
            callback(500, {
              error: 'File did not create',
            });
          } else {
            callback(
              200,
              callback(200, {
                message: 'File was create successfully!',
              })
            );
          }
        });
      } else {
        callback(400, {
          message: 'User already created',
        });
      }
    });
  } else {
    callback(400, {
      message: 'Bad request',
    });
  }
};
handler._users.get = (requestProperties, callback) => {
  callback(200, {
    message: 'Yes its user get method',
  });
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
