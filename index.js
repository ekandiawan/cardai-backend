// const cool = require('cool-ascii-faces');
const express = require('express');
// const app = express();
// const cors = require("cors");
const path = require('path');
// const database = require('./database.js')
const port = process.env.PORT || 5000;
const db = require('./database.js')
require('dotenv').config();

// app.use(cors());
// app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://calm-lowlands-56636.herokuapp.com/');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/user', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM Users');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/userdb', db.getUsers)
  .get('/cool', (req, res) => res.send(cool()))
  .listen(port, () => console.log(`Listening on ${ port }`));

//   app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
//   });
  
//   // User API
//   app.get('/user', (req, res) => {
//     database.getUsers()
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })
  
//   app.post('/user/add', (req, res) => {
//     database.createUser(req.body)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })

//   app.put('/user/edit', (req, res) => {
//     database.updateUser(req.body)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })
  
//   app.delete('/user/remove/:id', (req, res) => {
//     database.deleteUser(req.params)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })

//   // UserCard API
//   app.get('/user-card', (req, res) => {
//     database.getUserCards(req.body)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })
  
//   app.post('/user-card/add', (req, res) => {
//     database.createUserCard(req.body)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })
  
//   app.delete('/user-card/remove', (req, res) => {
//     database.deleteUserCard(req.body)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   })

//   // merchant based on location API
//   app.get('/merchant-by-', (req, res) => {
//     database.getMerchantLocation(req.query)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })
//   });

// app.listen(port, () => {
//     console.log(`server has started on port ${port}.`)
// });