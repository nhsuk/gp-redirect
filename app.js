const express = require('express');
const log = require('./lib/logger');

const app = express();
const port = 3002;

app.get('/route-to-gp', (req, res) => {
  log.info(req);
  res.send(req.get('Referer'));
});

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});
