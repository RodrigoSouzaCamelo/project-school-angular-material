module.exports = (req, res, next) => {
  const delayInMillis = 1000;

  setTimeout(next, delayInMillis);
};