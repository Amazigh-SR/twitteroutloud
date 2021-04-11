require("dotenv").config();
let {
  PORT,
  TWITTER_API_SECRET_KEY,
  TWITTER_API_KEY,
  ACCESS_TOKEN_SECRET,  //? is this necessary?
  ACCESS_TOKEN,         //? is this necessary?
  FRONT_END_PATH,
  BACK_END_PATH,
} = process.env;

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const cors = require("cors");

const path = require("path");

const passport = require("passport");
const { Strategy } = require("passport-twitter");
const Twitter = require("twitter");

const db = require("./db/helpers/index");


const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: FRONT_END_PATH })); // borrowed from this SO response: https://stackoverflow.com/a/61115624

app.set("trust proxy", 1);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'], //? these keys should be .env
  maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
}));

passport.use(
  new Strategy(
    {
      consumerKey: TWITTER_API_KEY,
      consumerSecret: TWITTER_API_SECRET_KEY,
      callbackURL: BACK_END_PATH + "/auth/callback",
      includeEmail: true,
    },
    function (token, tokenSecret, profile, cb) {
      const { id, emails, photos, username } = profile;

      db.createOrFindByTwitterID(
        id,
        username,
        emails[0].value,
        token,
        tokenSecret,
        photos[0].value
      )
        .then((res) => {
          return cb(null, id);
        })
        .catch((err) => {
          console.log("Error: ", err.message);
          return cb(null, id); //! revisit the removal of this?
        });
    }
  )
);

app.use(passport.initialize());

app.get("/auth", passport.authenticate("twitter")); //? auth router?

app.get(
  "/auth/callback",
  passport.authenticate("twitter", {
    failureRedirect: FRONT_END_PATH + "/login",
    session: false,
  }),
  function (req, res) {
    req.session.userID = req.user;
    // Successful authentication, redirect home.
    res.redirect(FRONT_END_PATH);
  }
);

app.get("/validate", (req, res) => { //? /session/validate => session router?
  const userID = req.session && req.session.userID;
  
  db.getUserByID(userID)
  .then(row => {
    if (row) {
      return res.send("valid"); //! this is an opportunity to send back the full profile
    }
    return res.send("invalid");
  })
})

app.delete('/session', (req, res) => {
  req.session.userID = null; 
  res.send()
})

app.get("/tweets", (req, res) => {
  const userID = req.session.userID;

  db.getUserByID(userID).then((rows) => {
    const { token, secret_token } = rows;
    const client = new Twitter({
      consumer_key: TWITTER_API_KEY,
      consumer_secret: TWITTER_API_SECRET_KEY,
      access_token_key: token,
      access_token_secret: secret_token,
    });
    
    const params = { tweet_mode: "extended", count: 2 };
    
    client
      .get(`statuses/home_timeline`, params)
      .then((timeline) => {
        cache = timeline;

        res.send(timeline);
      })
      .catch((error) => res.send(error));
  });
});

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
