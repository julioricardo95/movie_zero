
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');

//settings
app.use(sslRedirect(['development']));
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/appget'));

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'))