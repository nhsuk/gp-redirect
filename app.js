const express = require('express');

const app = express();
const port = 3002;

app.get('/route-to-gp', (req, res) => {
  console.log(req);
  res.send(req.get('Referer'));
});

app.listen(port, () =>{
  console.log(`App listening on port ${port}`);
});
