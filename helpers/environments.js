/**
 * Title: Environments
 * Description: A helper file for handle environment and sensitive data
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

// module scaffolding
const environments = {};

// staging environment
environments.staging = {
  port: 3000,
  envName: 'staging',
  secretKey: 'lsdjorelkjedsrfujoiseur343edf',
};

// production environment
environments.production = {
  port: 5000,
  envName: 'production',
  secretKey: 'lkqw3yre8oyulkcfnskueyreur343edf',
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
  currentEnvironment.trim() === 'production'
    ? environments.production
    : environments.staging;

// export module
module.exports = environmentToExport;
