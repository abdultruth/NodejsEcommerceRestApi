const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auths');
const variationRouter = require('./routes/variation');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');


const { error } = require('console');
const { stringify } = require('querystring');


logger.token('body', req => {
  return JSON.stringify(req.body)
})



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next();
})




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



if (process.env.NODE_ENV === 'development') {
  console.log(`Your ecommerce website is in ${process.env.NODE_ENV} mode ...`)
  app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))
}

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/accounts', authRouter);
app.use('/api/variations', variationRouter);
app.use('/api/categorys', categoryRouter);
app.use('/api/orders', orderRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `Can't find ${req.originalUrl} on this Server!`
  // })
  
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));

})

app.use(globalErrorHandler)

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
  res.render('error');
});

module.exports = app;
