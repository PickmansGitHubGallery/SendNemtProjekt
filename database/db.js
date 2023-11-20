const sqlite3 = require('sqlite3');

const path = require('path');
const dbPath = path.join(__dirname,'SendNemtDataBase.db');
const db = new sqlite3.Database(dbPath);

const crypto = require('crypto');

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
function getCurrentTimestamp() {
    const currentDateTime = new Date();
    // Format the date and time as a string (e.g., "2023-11-13 12:34:56")
    const formattedDateTime = currentDateTime.toISOString().replace('T', ' ').slice(0, 19);
  
    return formattedDateTime;

}
function getUserInfo(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM User WHERE email = ?', [email], async function (err, userData) {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}
  function getAllPackagesByEmail(email) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM Package WHERE sEmail = ? OR rEmail = ?', [email,email], async function (err,packages) {
        if (err) {
          reject(err);
        } else {
          resolve(packages);
        }
      });
    });
}
function insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone,size,weight) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Package (sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, createdAt, status, updatedAt,size,weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, getCurrentTimestamp(), 'SENT', getCurrentTimestamp(),size,weight ], function (err) {
      if (err) {
        reject(err);
      } else {
        var hashID = hashPassword(this.lastID.toString());
        db.run('UPDATE Package SET hashID = ? WHERE id = ?', [hashID, this.lastID], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(hashID);
          }
        });
        resolve(hashID);
      }
    });
  });
}
function createUser(email, password) {
let hashWord = hashPassword(password);
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO User(email, passwordHash) VALUES (?, ?)', [email, hashWord], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM User WHERE email = ?', [email], async function (err, userData) {
      if (err) {
        reject(err);
        return;
      }
      if (!userData) {
        reject(new Error('User not found'));
        return;
      }
      // Hash the entered password
      const enteredPasswordHash = hashPassword(password);

      // Compare the hashed entered password with the hashed password from the database
      if (enteredPasswordHash === userData.passwordHash) {
        resolve(userData); // Resolve with the user data
      } else {
        reject(new Error('Incorrect password'));
      }
    });
  });
}
function updateUserDetails(email, newName, newPhone, newAddress) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE User SET name = ?, phone = ?, address = ? WHERE email = ?',[newName, newPhone, newAddress, email],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes); // Number of rows affected by the update
        }
      }
    );
  });
}
function authenticateToken (token)
{
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM User WHERE token = ?', [token], async function (err, userData) {
      if (err) {
        reject(err);
        return;
      }
      if (!userData) {
        reject(new Error('User not found'));
        return;
      }
      resolve(userData);
  })
  });
}
function getPackageByHash(hashID){
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Package WHERE hashID = ?', [hashID], async function (err, packageData) {
      if (err) {
        reject(err);
        return;
      }
      if (!packageData) {
        reject(new Error('Package not found'));
        return;
      }
      resolve(packageData);
  })
  });
}
function setAuthenticationToken (email)
{
  let tokenhash = hashPassword(email);
  console.log("Vi er i db.setAuthenticationToken"+tokenhash);
  return new Promise((resolve, reject) => {
    db.run('UPDATE User SET token = ? WHERE email = ?',[tokenhash, email],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(tokenhash); 
        }
      }
    );
  });
}
function getAllPackagesByPhone(tlf) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Package WHERE sPhone = ? OR rPhone = ?', [tlf,tlf], async function (err,packages) {
      if (err) {
        reject(err);
      } else {
        resolve(packages);
      }
    });
  });
}
function getPackageByID(ID){
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Package WHERE ID = ?', [ID], async function (err, packageData) {
      if (err) {
        reject(err);
        return;
      }
      if (!packageData) {
        reject(new Error('Package not found'));
        return;
      }
      resolve(packageData);
  })
  });
}
module.exports = {
  insertPackage,
  createUser,
  authenticateUser,
  updateUserDetails,
  authenticateToken,
  setAuthenticationToken,
  getUserInfo,
  getAllPackagesByEmail,
  getPackageByHash,
  getPackageByID,
  getAllPackagesByPhone
};
