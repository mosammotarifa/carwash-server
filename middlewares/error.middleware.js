
const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).send({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = { errorHandler };
