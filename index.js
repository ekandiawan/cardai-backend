const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgres://ejrtdccrlpbnbe:ca7b51fbc6b932c2c814505edff0ae856b559916c1e02c15f9a70b940af8ea9c@ec2-52-73-149-159.compute-1.amazonaws.com:5432/ddt6o9nfhqbotb",
  ssl: {
    rejectUnauthorized: false
  }
});
const PORT = process.env.PORT || 5000;

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
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));