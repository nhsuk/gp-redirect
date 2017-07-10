const path = require('path');
const express = require('express');
const log = require('./lib/logger');
const rewriteUrl = require('./lib/rewriteUrl');
const constants = require('./config/constants');

const app = express();

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
  log.error({ req }, 'Unable to redirect');
  return res.sendFile(path.join(__dirname, '/views/options.html'));
});

module.exports = app;
