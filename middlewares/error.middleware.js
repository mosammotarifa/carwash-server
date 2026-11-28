
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    Number.isInteger(err.status) && err.status >= 400 && err.status <= 599
      ? err.status
      : 500;

  res.status(statusCode).send({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = { errorHandler };
