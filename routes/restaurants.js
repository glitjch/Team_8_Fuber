/*
 * All routes for restaurants are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  // get all restaurants
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM restaurants;`)
      .then(data => {
        const restaurants = data.rows;
        res.json({ restaurants });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // get restaurants from home based on address. Using simple filter e.g. include Vancouver, for now
  router.get("/location-based", (req, res) => {
    console.log("location-based in routes");
    console.log('req',req.query);
    const getRestaurantsByAddress = `SELECT * FROM restaurants WHERE location LIKE $1;`;
    const values = [req.query.address];
    return db.query(getRestaurantsByAddress, values)
      .then(data => {
        console.log('data', data.rows);
        res.json({data: data.rows})
        // res.send("hi")
        // res.render("restaurants")
      })
      .catch(error => console.log(error));
  });
  


  // do not delete
  return router;
};
