function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    errorAr: 'حدث خطأ ما!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

module.exports = errorHandler;