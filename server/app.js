const express = require('express');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://52.65.222.108/'],
    credentials: true,
  })
);

app.use('/', routes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('Unable to connect to MongoDB.', err));

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
