const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const { Strategy } = require("passport-twitter");
const session = require("express-session");
// load .env data into process.env
require("dotenv").config();
const { PORT, TWITTER_API_SECRET_KEY, TWITTER_API_KEY } = process.env;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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

      console.log(profile);
      // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

app.use(passport.initialize());

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/callback",
  passport.authenticate("twitter", {
    failureRedirect: "localhost:3000/login",
    session: false,
  }),
  function (req, res) {
    req.session.userID = "req.user.id";
    // Successful authentication, redirect home.
    res.redirect("/");
    // res.send("ok");
  }
);

app.listen(PORT || 8000, () => {
  console.log(`Example app listening on port ${PORT}`);
});
