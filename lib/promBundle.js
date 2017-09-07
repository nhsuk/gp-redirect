const expressPromBundle = require('express-prom-bundle');
const buckets = require('../config/constants').promHistogramBuckets;

const promBundle = expressPromBundle({ includePath: true, buckets });

module.exports = {
  middleware: promBundle,
  promClient: promBundle.promClient,
};
