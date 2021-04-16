require("dotenv").config();
let {
  PORT,
  TWITTER_API_SECRET_KEY,
  TWITTER_API_KEY,
  BEARER_TOKEN,
  ACCESS_TOKEN_SECRET, //? is this necessary?
  ACCESS_TOKEN, //? is this necessary?
  FRONT_END_PATH,
  BACK_END_PATH,
} = process.env;

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const path = require("path");

const passport = require("passport");
const { Strategy } = require("passport-twitter");
const Twitter = require("twitter");
const Twitter2 = require("twitter-v2");

const db = require("./db/helpers/index");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: FRONT_END_PATH })); // borrowed from this SO response: https://stackoverflow.com/a/61115624

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"], //? these keys should be .env
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  })
);

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

app.get("/validate", (req, res) => {
  //? /session/validate => session router?
  const userID = req.session && req.session.userID;

  db.getUserByID(userID).then((row) => {
    if (row) {
      const profile = { username: row.username, image_url: row.image_url };
      const dbSettings = row.settings;
      return res.send({ valid: true, dbSettings, profile });
    }
    return res.send({ valid: false });
  });
});

app.delete("/session", (req, res) => {
  const userID = req.session && req.session.userID;
  const settings = req.body;

  //store settings in users table on logout
  db.updateUserSettings(userID, settings);

  req.session.userID = null;
  res.send();
});

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

    const params = { tweet_mode: "extended", count: 200 };

    client
      .get(`statuses/home_timeline`, params)
      .then((timeline) => {
        cache = timeline;

        res.send(timeline);
      })
      .catch((error) => res.send(error));
  });
});

app.get("/thread/:id", (req, res) => {
  const params = {
    query: `conversation_id:${req.params.id} -is:retweet lang:en`,
    max_results: 100,
    tweet: {
      fields: [
        "created_at",
        // "entities",
        "in_reply_to_user_id",
        "referenced_tweets",
        // "referenced_tweets",
        // "source",
        "author_id",
      ],
    },
  };

  const client = new Twitter2({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET_KEY,
    // access_token_key: ACCESS_TOKEN,
    // access_token_secret: ACCESS_TOKEN_SECRET,
    bearer_token:
      "AAAAAAAAAAAAAAAAAAAAADqHOQEAAAAAUXcLKpwk3sLx904qgLtKxnOLmA8%3D8AhyKakoWFg3aPIGmgGtW72bg8wPReNhYdnSedRX6JbsVUYV4G",
  });

  client
    .get(`tweets/search/recent`, params)
    .then((timeline) => {
      cache = timeline;

      res.send(timeline);
    })
    .catch((error) => res.send(error));
});

app.get("/tweet2/:id", (req, res) => {
  const params = {
    ids: req.params.id,
    tweet: {
      fields: ["conversation_id"],
    },
  };

  const client = new Twitter2({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET_KEY,
    // access_token_key: ACCESS_TOKEN,
    // access_token_secret: ACCESS_TOKEN_SECRET,
    bearer_token: BEARER_TOKEN,
  });

  client
    .get(`tweets`, params)
    .then((timeline) => {
      cache = timeline;

      res.send(timeline);
    })
    .catch((error) => res.send(error));
});

app.get("/tweets2/:ids", (req, res) => {
  const params = {
    ids: req.params.ids,
    tweet: {
      fields: ["conversation_id", "in_reply_to_user_id"],
    },
    user: {
      fields: ["created_at", "username", "name"],
    },
  };

  const client = new Twitter2({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET_KEY,
    // access_token_key: ACCESS_TOKEN,
    // access_token_secret: ACCESS_TOKEN_SECRET,
    bearer_token: BEARER_TOKEN,
  });

  client
    .get(`tweets`, params)
    .then((timeline) => {
      cache = timeline;

      res.send(timeline);
    })
    .catch((error) => res.send(error));
});

app.get("/usertimeline/:id", (req, res) => {
  const params = {
    // id: req.params.id,
    tweet: {
      fields: ["conversation_id"],
    },
  };

  const client = new Twitter2({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRET_KEY,
    // access_token_key: ACCESS_TOKEN,
    // access_token_secret: ACCESS_TOKEN_SECRET,
    bearer_token: BEARER_TOKEN,
  });

  client
    .get(`users/${req.params.id}/tweets`, params)
    .then((timeline) => {
      cache = timeline;

      res.send(timeline);
    })
    .catch((error) => res.send(error));
});

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
