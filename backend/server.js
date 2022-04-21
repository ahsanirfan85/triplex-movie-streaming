// Loading .env data into process.env
require("dotenv").config();

// Defining the Port
const PORT = 3001;

// Express App Setup
const express = require("express"); // requiring express
const app = express(); // what does this do?
app.use(express.urlencoded({ extended: true })); // what does this do?
// app.use(express.static("public")); // serves up the static files to the front end

// PG database client/connection setup
const pg = require("pg"); // requiring postgresql
const dbParams = process.env.DB_URL; 
const client = new pg.Client(dbParams); // creating a new connection to the DB

// connecting to the database
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    //client.end();
  });
});

// Morgan Setup
const morgan = require("morgan"); // requiring morgan
app.use(morgan("dev")); // use morgan in this file

/* ROUTES GO BELOW HERE */

app.get("/posts/:type/:id/", (req, res) => {
  client
    .query('SELECT * FROM posts WHERE movie_id=$1 AND type=$2;',[req.params.id, req.params.type])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data.rows);
    })
    .catch((error) => {console.log(error)});
});

app.get("/watchlist/:userId", (req, res) => {
  client
    .query('SELECT * FROM watchlist WHERE user_id=$1',[req.params.userId])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data.rows);
    })
    .error((error) => {console.log(error)});

});

/* ROUTES GO ABOVE HERE */

// Express app listening for requests
app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});