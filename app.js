const path = require('path');
const express = require('express');
const log = require('./lib/logger');
const rewriteUrl = require('./lib/rewriteUrl');
const constants = require('./config/constants');

const app = express();

app.use((req, res, next) => {
  log.debug(req);
  next();
});

app.get('/', (req, res) => {
  res.redirect(301, constants.SITE_ROOT);
});

app.get(constants.SITE_ROOT, (req, res, next) => {
  const debug = req.query.debug;
  const referer = req.get('referer');
  const rewrittenUrl = rewriteUrl(referer);

  if (debug === '' || debug) {
    res.json({
      headers: req.headers,
      redirectTo: rewrittenUrl,
    });
    next();
  }

  if (rewrittenUrl) {
    log.info(`Redirecting request from ${referer} to ${rewrittenUrl}`);
    res.redirect(rewrittenUrl);
    next();
  }

  log.info('Unable to redirect');
  res.sendFile(path.join(__dirname, '/views/options.html'));
});

module.exports = app;
