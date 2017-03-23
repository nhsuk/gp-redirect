const log = require('./lib/logger');
const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});