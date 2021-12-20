var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");
const config = require('../config');
const bcrypt = require('bcrypt');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login', (req, res) => {
  let response = {
    err: false,
    message: '',
    data: null
  }
  req.getConnection((err, conn) => {
    conn.query(`select * from user where username = '${req.body.username}'`, (err, dataUser) => {
      if (err) {
        console.log(err);
        console.error(err);
        response.err = err;
        response.message = `failed to find user with username ${req.body.username}`;
        return res.json(response);
      }
      if (!dataUser.length > 0) {
        response.err = true;
        response.message = `user with username ${req.body.username} is not exist`;
        return res.json(response);
      }
      if (!bcrypt.compareSync(req.body.password, dataUser[0].password)) {
        response.err = true;
        response.message = `Password yang Anda masukkan salah`;
        return res.json(response);
      } else {
        //generate token
        let token = jwt.sign({
          username: dataUser[0].username
        }, config.secretKey, {
          expiresIn: 86400
        });

        dataUser[0].token = token;
        // console.log("token", token);
        response.data = dataUser[0]
      }
      res.json(response);
    })
  })
})

router.post('/register', (req, res) => {
  let response = {
    err: false,
    message: '',
    data: null
  }
  req.getConnection((err, conn) => {
    const saltRounds = 10;
    conn.query(`select * from user where username = '${req.body.username}'`, (err, userAccount) => {
      if (err) {
        console.error(err);
        response.err = err;
        response.message = `failed to find user with username ${req.body.username}`;
        return res.json(response);
      }
      if (userAccount.length > 0) {
        response.err = true;
        response.message = `username ${req.body.username} already exist`;
        return res.json(response);
      }

      conn.query(`INSERT INTO user (username, password, role) VALUES
          ('${req.body.username}', '${bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8))}', 
          '${req.body.role}')`, (err, newUser) => {
        if (err) {
          console.log('errrrr', err);
          response.err = err;
          response.message = 'failed to save user data';
        } else {
          response.message = 'Register Berhasil, silahkan login, klik tautan di bawah'
        }
        res.json(response)
      })
    })
  })
})

module.exports = router;
