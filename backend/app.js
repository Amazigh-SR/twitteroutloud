// load .env data into process.env
require("dotenv").config();
let {
  PORT,
  TWITTER_API_SECRET_KEY,
  TWITTER_API_KEY,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN,
} = process.env;

const db = require("./db/helpers/index");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const { Strategy } = require("passport-twitter");
const session = require("express-session");
const cors = require("cors");
const Twitter = require("twitter");


const indexRouter = require("./routes/index");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

passport.use(
  new Strategy(
    {
      consumerKey: TWITTER_API_KEY,
      consumerSecret: TWITTER_API_SECRET_KEY,
      callbackURL: "http://localhost:3001/auth/callback",
      includeEmail: true,
    },
    function (token, tokenSecret, profile, cb) {
      const { id, emails, photos, username } = profile;

      db.addUser(id, username, emails[0].value, token, tokenSecret, photos[0].value)
      .then(rows => {
        console.log(`Successfully added Twitter User: ${rows.twitter_id} to database!`)
        return cb(null, id);
      })

    }
  )
);

app.use(passport.initialize());

app.get("/auth", passport.authenticate("twitter"));

app.get(
  "/auth/callback",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000/login",
    session: false,
  }),
  function (req, res) {
    req.session.userID = req.user;
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
    // res.send("ok");
  }
);

app.get("/tweets", (req, res) => {
  const userID = req.session.userID;
  const params = { tweet_mode: "extended", count: 2 };
  db.getUserById(userID)
    .then(rows => {
      const {token, secret_token} = rows;
      const client = new Twitter({
        consumer_key: TWITTER_API_KEY,
        consumer_secret: TWITTER_API_SECRET_KEY,
        access_token_key: token,
        access_token_secret: secret_token,
      });
      
        client
          .get(`statuses/home_timeline`, params)
          .then((timeline) => {
            cache = timeline;
            // console.log("timeline: ", timeline);
            res.send(timeline);
          })
          .catch((error) => res.send(error));
    })
});

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
