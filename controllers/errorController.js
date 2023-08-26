const AppError = require('../utils/appError')

module.exports = (err, req, res, next) => {

  if(err.name === 'CastError') {
    err.message = 'malformatted id'
    err.statusCode = 400
    err.status = 'fail'
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
      })

}   
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
    })
}