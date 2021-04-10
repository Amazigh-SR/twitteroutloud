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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));  // borrowed from this SO response: https://stackoverflow.com/a/61115624

// // !------------------
// const { createProxyMiddleware } = require("http-proxy-middleware");

// app.use(
//   "/tweets",
//   createProxyMiddleware({
//     target: "http://localhost:3000/", //original url

//     changeOrigin: true,

//     secure: false,

//     onProxyRes: function (proxyRes, req, res) {
//       proxyRes.headers["Access-Control-Allow-Origin"] = "*";
//     },
//   })
// );

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("trust proxy", 1);

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

      db.createOrFindByTwitterID(
        id,
        username,
        emails[0].value,
        token,
        tokenSecret,
        photos[0].value
      ).then(res => {
          return cb(null, id);
        })
        .catch((err) => {
          console.log("Error: ", err.message);
          console.log("User is already in the db")
          return cb(null, id);
        });
    }
  )
);

app.use(passport.initialize());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


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
  console.log(req.headers)
  const userID = req.session.userID;
  console.log("UserID: ", userID);
  const params = { tweet_mode: "extended", count: 2 };
  db.getUserByID(userID).then((rows) => {
    const { token, secret_token } = rows;
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
        // res.setHeader("Access-Control-Allow-Credentials", true);
        res.send(timeline);
      })
      .catch((error) => res.send(error));
  });
});

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
