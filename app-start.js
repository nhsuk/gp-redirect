const log = require('./lib/logger');
const app = require('./app');
const applicationStarts = require('./lib/promCounters').applicationStarts;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  applicationStarts.inc(1);
  log.info(`App listening on port ${port}`);
});
