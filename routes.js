/**
 * Title: Routes
 * Description: Application routes
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandlers');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

// export module
module.exports = routes;
