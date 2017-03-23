const express = require('express');
const log = require('./lib/logger');
const rewriteUrl = require('./lib/rewriteUrl');

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  log.debug(req);
  next();
});

app.get('/', (req, res) => {
  res.status(200).end();
});

app.get('/redirect', (req, res) => {
  const debug = req.query.debug;
  const referer = req.get('referer');
  const profileUrl = rewriteUrl(referer);

  if (debug === '' || debug) {
    res.json({
      headers: req.headers,
      redirectTo: profileUrl,
    });
  } else {
    log.info(`Redirecting request from ${referer} to ${profileUrl}`);
    res.redirect(302, profileUrl);
  }
});

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});
