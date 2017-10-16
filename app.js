const path = require('path');
const express = require('express');
const helmet = require('helmet');
const log = require('./lib/logger');
const rewriteUrl = require('./lib/rewriteUrl');
const constants = require('./config/constants');
const promBundle = require('./lib/promBundle');
const errorCounter = require('./lib/promCounters').errorPageViews;

const app = express();

// start collecting default metrics
promBundle.promClient.collectDefaultMetrics();
// metrics needs to be registered before routes wishing to have metrics generated
// see https://github.com/jochen-schweizer/express-prom-bundle#sample-uusage
app.use(promBundle.middleware);

app.use(helmet({
  noCache: true,
  frameguard: { action: 'deny' },
  hsts: { includeSubDomains: false },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['\'self\''],
      imgSrc: ['\'self\'', 'data:'],
      styleSrc: ['\'unsafe-inline\''],
    }
  },
}));

app.use((req, res, next) => {
  log.debug({ req });
  next();
});

app.get('/', (req, res) => {
  res.redirect(301, constants.SITE_ROOT);
});

app.get(constants.SITE_ROOT, (req, res) => {
  const debug = req.query.debug;
  const referer = req.get('referer');
  const rewrittenUrl = rewriteUrl(referer);

  if (debug === '' || debug) {
    log.info({ req, debug: true, rewrittenUrl }, `Not redirecting request from ${referer} to ${rewrittenUrl} due to debug flag`);
    return res.json({
      headers: req.headers,
      redirectTo: rewrittenUrl,
    });
  }
  if (rewrittenUrl) {
    log.info({ referer, rewrittenUrl }, `Redirecting request from ${referer} to ${rewrittenUrl}`);
    return res.redirect(rewrittenUrl);
  }
  errorCounter.inc(1);
  log.error({ req }, 'Unable to redirect');
  return res.sendFile(path.join(__dirname, '/views/options.html'));
});

module.exports = app;
