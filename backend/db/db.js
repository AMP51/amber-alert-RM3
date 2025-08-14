const mysql = require("mysql2");
const config = require("./config");
const userSchema = require("../schemas/userSchema");

const connectDB = () => {
  const { database, ...baseConfig } = config;
  const tempConn = mysql.createConnection(baseConfig);

  tempConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\``,
    (err) => {
      if (err) throw err;
      console.log(`Database '${database}' `);

      const pool = mysql.createPool(config);

      pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`DROP TABLE IF EXISTS users;`, (dropErr) => {
          if (dropErr) throw dropErr;

          conn.query(userSchema, (tblErr) => {
            if (tblErr) throw tblErr;
            console.log(" 'users' table");
            conn.release();
          });
        });
      });
    }
  );
};

module.exports = connectDB;
