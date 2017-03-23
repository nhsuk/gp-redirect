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
  res.status(200).end();
});

app.get(constants.SITE_ROOT, (req, res) => {
  const debug = req.query.debug;
  const referer = req.get('referer');
  const rewrittenUrl = rewriteUrl(referer);

  if (debug === '' || debug) {
    res.json({
      headers: req.headers,
      redirectTo: rewrittenUrl,
    });
  }
  if (rewrittenUrl) {
    log.info(`Redirecting request from ${referer} to ${rewrittenUrl}`);
    res.redirect(302, rewrittenUrl);
  } else {
    log.info('Unable to redirect');
    res.sendFile(path.join(__dirname, '/views/options.html'));
  }
});

module.exports = app;
