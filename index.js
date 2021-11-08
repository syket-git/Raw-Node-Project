/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up / down time users defined links
 * Author: Syket Bhattachergee
 * Date: 11/7/2021
 */

// Dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// Testing file creation
data.delete('test', 'newFile', (err) => {
  console.log(err);
});

// Create Server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`environment is : ${environment.port}`);
    console.log(`Server up and running on ${environment.port}`);
  });
};

//handling req & res function
app.handleReqRes = handleReqRes;

//Start the server
app.createServer();
