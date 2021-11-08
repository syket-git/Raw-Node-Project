//Dependencies
const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//base directory of the data folder
lib.baseDir = path.join(__dirname + './../.data/');

//write data to file
lib.create = (dir, file, data, callback) => {
  // open file for write
  fs.open(
    lib.baseDir + dir + '/' + file + '.json',
    'wx',
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //we have to convert the data to string
        const stringifyData = JSON.stringify(data);
        // Write data to new file
        fs.writeFile(fileDescriptor, stringifyData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err2) => {
              if (!err2) {
                callback(false);
              } else {
                callback('Error close to file');
              }
            });
          } else {
            callback('Error Writing to new file');
          }
        });
      } else {
        callback('Could not create new file, it may already exists.');
      }
    }
  );
};

//Read data to file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
    callback(err, data);
  });
};

// Update data
lib.update = (dir, file, data, callback) => {
  //open file
  fs.open(
    lib.baseDir + dir + '/' + file + '.json',
    'r+',
    (err, fileDescriptor) => {
      //   console.log('hello');
      if (!err && fileDescriptor) {
        // convert the data to string
        const stringifyData = JSON.stringify(data);

        // truncate the existing file
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            fs.writeFile(fileDescriptor, stringifyData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback('Error file to close');
                  }
                });
              } else {
                callback('Error file to write');
              }
            });
          } else {
            callback('Error file to truncate');
          }
        });
      } else {
        callback('Error updating! file may not exists');
      }
    }
  );
};

// Delete file

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error file to delete');
    }
  });
};

// module exports
module.exports = lib;
