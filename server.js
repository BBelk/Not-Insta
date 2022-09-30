require('dotenv').config();
const path = require('path');
const { existsSync, mkdirSync } = require('fs');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

let routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
    // Creates a temporary directory if it doesn't exist
    const dir = path.join(__dirname, 'tmp/');
    if (!existsSync(dir)) {
      mkdirSync(dir, 0744);
    }
  });
});
