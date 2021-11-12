/**
 * Title: Utility Function
 * Description: A utility function for handle utility related data
 * Author: Syket Bhattachergee
 * Date: 11/12/2021
 */

// Dependencies
const { createHmac } = require('crypto');
const environments = require('../helpers/environments');

// module scaffolding
const utilities = {};

utilities.parseJson = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

utilities.hash = (str) => {
  if (typeof str === 'string' && str?.length > 0) {
    const hmac = createHmac('sha256', environments.secretKey)
      .update(str)
      .digest('hex');
    return hmac;
  } else {
    return false;
  }
};

// export module
module.exports = utilities;
