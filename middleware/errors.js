import ErrorHandler from "../utils/errorHandler"

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  let error = { ...err }

  error.message = err.message || "Internal Server Error"

  // Wrong Mongooose ObjectId Error Handler
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorHandler(message, 404)
  }

  // Mongoose Validation Error Handler
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: err.message,
    stack: err.stack,
  })
}
