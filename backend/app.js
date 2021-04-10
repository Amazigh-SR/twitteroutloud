const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const { Strategy } = require("passport-twitter");
const session = require("express-session");
const cors = require("cors");

// load .env data into process.env
require("dotenv").config();
let {
  PORT,
  TWITTER_API_SECRET_KEY,
  TWITTER_API_KEY,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN,
} = process.env;
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET_KEY,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

const indexRouter = require("./routes/index");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// client = new Twitter({
//   consumer_key: TWITTER_API_KEY,
//   consumer_secret: TWITTER_API_SECRET_KEY,
//   access_token_key: null,
//   access_token_secret: null,
// });
// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// app.set("trust proxy", 1);

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
      const { id, emails } = profile;

      client.access_token_key = token;
      client.access_token_secret = tokenSecret;

      console.log("token: " + token);
      console.log("tokenSecret: " + tokenSecret);
      console.log("id: ", id);
      console.log("emails: ", emails);
      // console.log(profile);
      // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(null, id);
      // });
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
    // console.log("req.session.userID: ", req.session.userID)
    console.log("req.user: ", req.user);
    // console.log("req: ", req);
    req.session.userID = req.user;
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
    // res.send("ok");
  }
);

app.get("/tweets", (req, res) => {
  const params = { tweet_mode: "extended", count: 2 };

  // const client = new Twitter({
  //   consumer_key: TWITTER_API_KEY,
  //   consumer_secret: TWITTER_API_SECRET_KEY,
  //   access_token_key: ACCESS_TOKEN,
  //   access_token_secret: ACCESS_TOKEN_SECRET,
  // });

  console.log("tweets req: ", req);

  client
    .get(`statuses/home_timeline`, params)
    .then((timeline) => {
      cache = timeline;
      // console.log("timeline: ", timeline);
      res.send(timeline);
    })
    .catch((error) => res.send(error));
});

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
