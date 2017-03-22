const express = require('express');
const log = require('./lib/logger');

const app = express();
const port = process.env.PORT;

app.get('/route-to-gp', (req, res) => {
  log.debug(req);
  res.send(`Refering page: ${req.get('Referer')}`);
});

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});
