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
    client.end();
  });
});

// Morgan Setup
const morgan = require("morgan"); // requiring morgan
app.use(morgan("dev")); // use morgan in this file

/* ROUTES GO BELOW HERE */

const array = [
  {
    id: "1",
    body: "What an amazing first episode. The camera work was delightful the way it made me felt as confused as him was amazing. Plus the dialogue between himself sold it.",
    username: "Mustafa",
    userId: "1",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "2",
    body: "A strong first episode setting the scene of a multiple personality protagonist. The reflection metaphors work well (mirrors, puddles, scales ...) even if they are pasted on so thickly. So too the missing time around the girl, the goldfish and most impactfully the fighting. The use of implied violence is compelling especially in the car chase where there is already explosive action - this also informs us of the character of the alter ego.",
    username: "davincecode",
    userId: "2",
    parentId: null,
    createdAt: "2021-08-18T23:00:33.010+02:00",
  },
  {
    id: "3",
    body: "I just finished watching the first episode (which was released yesterday), and I can confidently say that this TV series will become a huge hit... I was hesitant at first because Moon Knight is quite different from your typical superhero character, but probably this different flavor will be its strength... Can't wait & see how the plot develops.",
    username: "Ahsan",
    userId: "2",
    parentId: "1",
    createdAt: "2021-08-16T23:00:33.010+02:00",
  },
  {
    id: "4",
    body: "Just finished episode 1. It grabs your attention immediately and makes you question many things! I love the characters and am very interior see what Marc/Steven does when he isn't himself before Moonknight. I can't wait to see more! ",
    username: "Andy",
    userId: "2",
    parentId: "2",
    createdAt: "2021-08-21T23:00:33.010+02:00",
  }
]

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(array);
});

/* ROUTES GO ABOVE HERE */

// Express app listening for requests
app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});