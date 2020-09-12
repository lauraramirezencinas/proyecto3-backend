require('dotenv').config();


const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport      = require('passport');
const cors         = require('cors');
const Usuario = require('./models/usuario-modelo');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, { useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



const session = require('./configs/session')
session(app)

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});


// passport.use(
//   new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log("Google account details:", profile);
//       Usuario.findOne({
//           googleID: profile.id
//         })
//         .then(user => {
//           if (user) {
//             done(null, user);
//             return;
//           }
//           Usuario.create({
//               googleID: profile.id,
//               nombre: profile.displayName,
//               email: profile.emails[0].value
//             })
//             .then(newUser => {
//               done(null, newUser);
//             })
//             .catch(err => done(err)); // closes User.create()
//         })
//         .catch(err => done(err)); // closes User.findOne()
//     })
// );

// default value for title local
app.locals.title = 'Sugar-place';

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000'] // <== aceptar llamadas desde este dominio
  })
);

const index = require('./routes/index');
app.use('/', index);

const usuario = require("./routes/usuario-routes");
app.use('/usuario', usuario);

const auth = require("./routes/auth-routes");
app.use('/auth', auth);

const producto = require("./routes/producto-routes");
app.use('/producto', producto);

const pedido = require("./routes/pedido-routes");
app.use('/pedido', pedido);

module.exports = app;
