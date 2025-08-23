const mysql = require("mysql2");
const config = require("./config");
const userSchema = require("../schemas/userSchema");
const adminAlertSchema = require("../schemas/adminAlertSchema");

const connectDB = () => {
  return new Promise((resolve, reject) => {
    const { database, ...baseConfig } = config;
    const tempConn = mysql.createConnection(baseConfig);

    tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``, (err) => {
      if (err) return reject(err);
      console.log(`Database '${database}'`);

      const pool = mysql.createPool(config);

      pool.getConnection((err, conn) => {
        if (err) return reject(err);

        {/* users table */ }
        conn.query(userSchema, (tblErr) => {
          if (tblErr) return reject(tblErr);
          console.log("'users' table created");

          {/* admin alerts table */ }
          conn.query(adminAlertSchema, (alertErr) => {
            if (alertErr) return reject(alertErr);
            console.log("'alerts' table created");

            conn.release();
            resolve(pool);
          });
        });
      });
    });
  });
};

module.exports = connectDB;
