var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();
var session = require('express-session');

var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var loginRouter = require('./routes/admin/login.js');
var adminRouter =require('./routes/admin/novedades.js');
var apiRouter = require('./routes/api.js')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'PW2021awqyeudj',
  cookie: {maxAge: null},
  resave: false,
  saveUninitialized: true
}))

secured = async(req,res,next) => {
    try{
        console.log(req.session.id_usuario);
        if(req.session.id_usuario){
            next();
        }else{
          console.log("No hay sesion, redirigiendo...");
            res.redirect('/admin/login');
        }
    }catch(error){
        console.log(error);
    }
};

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
app.use('/api', cors(), apiRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en puerto " + port);
});
