const express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        router = require('./router');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
router.initRoutes(app);

const server = app.listen(4000, () => {
  console.log('Server started');
});

