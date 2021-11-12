/**
 * Title: User handler
 * Description: A handler to handling user related data
 * Author: Syket Bhattachergee
 * Date: 11/12/2021
 */

//Dependencies
const { hash, parseJson } = require('../../helpers/utilities');
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

// User post handler

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

// User get Handler

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.query.phone === 'string' &&
    requestProperties.query.phone.trim()?.length === 11
      ? requestProperties.query.phone
      : false;

  if (phone) {
    data.read('users', phone, (err, user) => {
      if (!err && user) {
        const userData = parseJson(user);
        delete userData.password;

        callback(200, userData);
      } else {
        callback(400, {
          message: 'User not found',
        });
      }
    });
  } else {
    callback(400, {
      message: 'Something went wrong',
    });
  }
};

// Handler put handler
handler._users.put = (requestProperties, callback) => {
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

  const password =
    typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password?.trim()?.length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      data.read('users', phone, (err, uData) => {
        if (!err && uData) {
          const userData = parseJson(uData);

          console.log(userData);

          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }

          data.update('users', phone, userData, (err1, u) => {
            if (err1) {
              callback(500, {
                message: 'Internal server error',
              });
            } else {
              callback(200, {
                message: 'File was successfully updated!',
              });
            }
          });
        } else {
          callback(404, {
            message: 'User Not Found',
          });
        }
      });
    } else {
      callback(400, {
        message: 'Bad Request',
      });
    }
  } else {
    callback(400, {
      message: 'Bad request',
    });
  }
};

// User delete handler
handler._users.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim()?.length === 11
      ? requestProperties.body.phone
      : false;

  if (phone) {
    data.read('users', phone, (err2, user) => {
      if (err2) {
        callback(404, {
          message: 'File was not found',
        });
      } else {
        data.delete('users', phone, (err) => {
          if (err) {
            callback(500, {
              message: 'Internal server error',
            });
          } else {
            callback(200, {
              message: 'File was deleted successfully',
            });
          }
        });
      }
    });
  } else {
    callback(400, {
      message: 'Bad request',
    });
  }
};

module.exports = handler;
