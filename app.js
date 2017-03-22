const express = require('express');
const log = require('./lib/logger');

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  log.debug(req);
  next();
});

app.get('/', (req, res) => {
  res.status(200).end();
});

app.get('/route-to-gp', (req, res) => {
  log.info(req);
  res.send(`Refering page: ${req.get('Referer')}`);
});

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});
