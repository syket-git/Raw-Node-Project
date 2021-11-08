/**
 * Title: Routes
 * Description: Application routes
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandlers');

const routes = {
  sample: sampleHandler,
};

// export module
module.exports = routes;
