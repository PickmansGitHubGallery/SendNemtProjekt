const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('SendNemtDataBase.db');

function getCurrentTimestamp() {
    const currentDateTime = new Date();
    
    // Format the date and time as a string (e.g., "2023-11-13 12:34:56")
    const formattedDateTime = currentDateTime.toISOString().replace('T', ' ').slice(0, 19);
  
    return formattedDateTime;
  }

function insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Package (sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, createdAt, status, updatedAt, size, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, getCurrentTimestamp(), 'SENT', getCurrentTimestamp(), size, weight ], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

module.exports = {
  insertData
};
