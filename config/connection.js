const mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mega"
  });
  
  conn.connect(function (err){
      if(err){
          console.log("Koneksi ke Database Error!.........")
      }else{
          console.log("Koneksi Ke Database Berhasil........");
      }
  });
  
  module.exports = conn;