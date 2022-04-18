require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
const getUsers = (request, response) => {
  pool.query(`SELECT * FROM public."Users" ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
*/

/* User query - all tested and worked (15 Mar)
const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM public."Users" ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { firstName, lastName, phoneNumber, email, countryCode } = body
    pool.query('INSERT INTO public."Users" ("firstName", "lastName", "phoneNumber", "email", "countryCode") VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, phoneNumber, email, countryCode], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added.`)
    })
  })
}

const updateUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { firstName, lastName, phoneNumber, email, countryCode, id } = body
    pool.query('UPDATE public."Users" SET "firstName" = $1, "lastName" = $2, "phoneNumber" = $3, "email" = $4, "countryCode" = $5 WHERE id = $6', [firstName, lastName, phoneNumber, email, countryCode, id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User details have been updated.`)
    })
  })
}

const deleteUser = (params) => {
  return new Promise(function(resolve, reject) {
    const { id } = params;
    pool.query('DELETE FROM public."Users" WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User deleted with ID: ${id}`)
    })
  })
}

// UserCard query - done
const getUserCards = (body) => {
  return new Promise(function(resolve, reject) {
    const { userID } = body;
    pool.query('SELECT * FROM public."UserCard" WHERE "userID" = $1 ORDER BY "userID" ASC', [userID], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createUserCard = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, cardName } = body
    pool.query('INSERT INTO public."UserCard" ("userID", "cardID") VALUES ((SELECT id FROM public."Users" WHERE "email" = $1), (SELECT id FROM public."Cards" WHERE "cardName" = $2))', [email, cardName], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`New card has been added.`)
    })
  })
}

const deleteUserCard = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, cardName } = body;
    pool.query('DELETE FROM public."UserCard" WHERE "userID" IN (SELECT id FROM public."Users" WHERE "email" = $1) AND "cardID" IN (SELECT id FROM public."Cards" WHERE "cardName" = $2)', [email, cardName], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Card deleted.`)
    })
  })
}

// GET merchants based on location - done!
const getMerchantLocation = (query) => {
  return new Promise(function(resolve, reject) {
    const {location} = query;
    pool.query(`SELECT m."merchantName", ml."buildingName", ml."address", ml."phoneNumber" FROM public."MerchantLocation" AS ml LEFT JOIN public."Merchants" AS m ON ml."merchantID" = m."id" LEFT JOIN public."Locations" AS l ON ml."locationID" = l."id" WHERE l."locationName" = $1`, [location], (error, results) => {
      if (error) {
        reject(error)
      }
     resolve(results.rows);
    })
  }) 
}
*/

module.exports = {
  pool,
  // getUsers,
  // createUser,
  // updateUser,
  // deleteUser,
  // getUserCards,
  // createUserCard,
  // deleteUserCard,
  // getMerchantLocation
};