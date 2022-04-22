// Loading .env data into process.env
require("dotenv").config()

// Defining the Port
const PORT = 3001

// Express App Setup
const express = require("express") // requiring express
const app = express() // what does this do?
app.use(express.urlencoded({ extended: true })) // what does this do?
// app.use(express.static("public")); // serves up the static files to the front end

// CORS package
const cors = require('cors')
app.use(cors());

// PG database client/connection setup
const pg = require("pg") // requiring postgresql
const dbParams = process.env.DB_URL
const client = new pg.Client(dbParams) // creating a new connection to the DB

// connecting to the database
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err)
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err)
    }
    console.log(result.rows[0].theTime)
    // >> output: 2018-08-23T14:02:57.117Z
    //client.end();
  })
})

// Morgan Setup
const morgan = require("morgan") // requiring morgan
app.use(morgan("dev")) // use morgan in this file

/* ROUTES GO BELOW HERE */

app.get("/posts/:type/:id/", (req, res) => {
  client
    .query("SELECT * FROM posts WHERE movie_id=$1 AND type=$2;", [
      req.params.id,
      req.params.type,
    ])
    .then((data) => {
      console.log(data.rows)
      res.header("Access-Control-Allow-Origin", "*")
      res.send(data.rows)
      console.log(data, req.params)
    })
    .catch((error) => {
      console.log(error)
    })
});

app.get("/watchlist/:userId", (req, res) => {
  client
    .query("SELECT * FROM watchlist WHERE user_id=$1", [req.params.userId])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.send(data.rows)
    })
    .catch((error) => {
      console.log(error);
    })
});

app.get("/watchlist/:userId/:type/:movieId", (req, res) => {
  client
    .query("SELECT is_selected FROM watchlist WHERE user_id=$1 AND movie_id=$2 AND type=$3;", [req.params.userId, req.params.movieId, req.params.type])
    .then((data) => {
      let label = '';
      if (typeof data.rows[0] === 'undefined' || !data.rows[0].is_selected) {
        label = 'Add to Watch List '
      } else {
        label = 'Remove from Watch List '
      }
      console.log(label);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(label);
    });
})

app.put("/watchlist/remove/:type/:user_id/:id", (req, res) => {
  client
    .query("UPDATE watchlist SET is_selected=false WHERE type=$1 AND user_id=$2 AND movie_id=$3", [req.params.type, req.params.user_id, req.params.id])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/watchlist/update/:type/:user_id/:id", (req, res) => {
  client
    .query("UPDATE watchlist SET is_selected=true WHERE type=$1 AND user_id=$2 AND movie_id=$3", [req.params.type, req.params.user_id, req.params.id])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/watchlist/add/:type/:user_id/:id", (req, res) => {
  client
    .query("INSERT INTO watchlist (user_id, movie_id, type, is_selected) VALUES ($1, $2, $3, $4)", [req.params.user_id, req.params.id, req.params.type, true])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Get the Average Rating for a given movie
app.get("/rate/:type/:movie_id", (req, res) => {
  client
    .query("SELECT SUM(rate) / COUNT(user_id) AS Average_Rate FROM rate WHERE movie_id = $1 and type = $2", [req.params.movieId, req.params.type])
    .then((data) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.send(data.rows)
      console.log(data.rows);
    })
    .catch((error) => {
      console.log(error);
    })
});

/* ROUTES GO ABOVE HERE */

// Express app listening for requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
