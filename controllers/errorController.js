const AppError = require('../utils/appError')


const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}.`
  return new AppError(message, 400)
}


const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value)

  const message = `Duplicate field value ${value}. please use another value!`
  return new AppError(message, 400)
}


const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid Token, please log in again!', 401)

const handleJWTExpiredError = () => new AppError('JWT Token Expired, Please log in again!', 401)

const handleReferenceError = () => new AppError('This Product is not available anymore', 400)

const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendProdError = (err, res) => {
  // OPerational, trusted errors: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
       status: err.status,
       message: err.message
    })
  }
  // Programming or other unknown error: don't leak error details
  else {
    // 1] Log error
    console.error('Error <..../***..../****/....>', err);

    // 2] send Generic Message
    res.status(500).json({
       status: 'error',
       message: 'SomeThing went very wrong!'
    })

  }
} 

module.exports = (err, req, res, next) => {
  // console.log(err.stack)

  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {

    sendDevError(err, res)

  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err}  

    if(error.name === 'CastError') error = handleCastErrorDB(error)
    if(error.code === 11000) error = handleDuplicateFieldsDB(error)
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error)
    if(error.name === 'JsonWebTokenError') error = handleJWTError()
    if(error.name === 'TokenExpiredError') error = handleJWTExpiredError()
    if(error.name === 'ReferenceError') error = handleReferenceError()

    sendProdError(err, res)
 }
}