require('dotenv').config({path: '.env'});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const CachePugTemplates = require('cache-pug-templates');

const indexRouter = require('./routes/index');
const drawingRouter = require('./routes/drawing');
const usersRouter = require('./routes/users');
const choicesRouter = require('./routes/choices')
const quoteRouter = require('./routes/quote');
const labelRouter = require('./routes/label');

const app = express();

app.disable('x-powered-by');
// view engine setup
const views = path.join(__dirname, 'views')
app.set('views', views );
app.set('view engine', 'pug');

const cache = new CachePugTemplates({ app, views })
cache.start();

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// database connection
try {
  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@lsiproductconfigurator.5xm1k.mongodb.net/LSIProductConfigurator?retryWrites=true&w=majority&useUnifiedTopology=true&useNewUrlParser=true`)
  console.log('DB Connected')
} catch (error) {
  console.log(error)
}

// routers
app.use('/', indexRouter);
app.use('/drawing', drawingRouter);
app.use('/users', usersRouter);
app.use('/choices', choicesRouter);
app.use('/quote', quoteRouter);
app.use('/label', labelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { pageTitle: 'Error', title: 'Sorry this page does not exist.', subTitle: 'Please contact us at 704-504-8399' });
});

module.exports = app;
