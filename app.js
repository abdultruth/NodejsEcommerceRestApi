const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');



const indexRouter = require('./routes/indexRouter');

//Auth & User Router
const authRouter = require('./routes/authsRouter');
const usersRouter = require('./routes/usersRouter');


const productsRouter = require('./routes/productsRouter');
const variationRouter = require('./routes/variationsRouter');
const categoryRouter = require('./routes/categoryRouter');
const orderRouter = require('./routes/ordersRouter');

//Reviews Routers
const productReviewRouter = require('./routes/productReviewsRouter');
const orderReviewRouter = require('./routes/orderReviewsRouter');



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
};

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/accounts', authRouter);
app.use('/api/variations', variationRouter);
app.use('/api/categorys', categoryRouter);
app.use('/api/orders', orderRouter);


app.use('/api/product-reviews', productReviewRouter);
app.use('/api/order-reviews', orderReviewRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find ${req.originalUrl} on this Server!`
  });
  
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));

});

app.use(globalErrorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500); 
//   res.render('error');
// });

app.use(globalErrorHandler);

module.exports = app;
