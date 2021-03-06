// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const twilio = require("./lib/twilio");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const cartDb = require('./lib/cart-db.js')

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const accountsRoutes = require("./routes/accounts");
const restaurantsRoutes = require("./routes/restaurants");
const ordersRoutes = require("./routes/orders");
const itemsRoutes = require("./routes/items");
const orderStatusesRoutes = require("./routes/statuses");
const orderLineItemsRoutes = require("./routes/lines");
const finalPageRoutes = require("./routes/final");
const checkoutRoutes = require("./routes/checkout");
const cartRoutes = require("./routes/cart");
const progressRoutes = require("./routes/progress");
const menusRoutes = require("./routes/menus");

// const placeOrderRoutes = require("./routes/place-order")
// const checkoutRoutes = require("./routes/checkout")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/accounts", accountsRoutes(db));
app.use("/api/restaurants", restaurantsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/statuses", orderStatusesRoutes(db));
app.use("/api/lines", orderLineItemsRoutes(db));
app.use("/api/final", finalPageRoutes(db));
app.use("/api/checkout", checkoutRoutes(db));
app.use("/api/cart", cartRoutes(db));
app.use("/api/progress", progressRoutes(db));
app.use("/api/menus", menusRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.cookie(`session_id`,`testtesttest`);
  res.render("index");
});

app.get("/", (req, res) => {
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

