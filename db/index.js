// export
module.exports = {
  ...require('./client'),
  ...require('./Products'),
  ...require('./users'),
  ...require('./checkout'),
  ...require('./admin'),
  ...require('./orders'),
  ...require('./orderProducts'),
  ...require('./seed'),
  // db methods
}