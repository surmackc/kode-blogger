const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const SequelStore = require('sequelstore-connect')(session);
const flash = require("connect-flash");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");
const apiController = require("./controllers/api_controller");
const loginController = require("./controllers/login_controller");
const userController = require("./controllers/user_controller");

//Setup passport
const passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

// Serve up static assets
app.use(express.static("client/build"));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
db.users.sync();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  // store: new SequelStore({ database: db.sequelize})
}))

// Use Controllers
app.use("/api", apiController);
// app.use("/login", loginController);
// app.use("/user", userController);

//Persistent login sessions (maybe?)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./controllers/user_controller')(app, passport);
require('./controllers/login_controller')(app, passport);

// Send all other requests to the React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
