var express = require('express');
var app = express();

const MEMRISECOURSE = require('./memrise-course');
const MEMRISELEVEL = require('./memrise-level');

app.get('/memrise1/', async (req, res) => {
  let r = await MEMRISECOURSE('171916/a_topecom/');
  res.send(JSON.stringify(r));
});

app.listen(process.env.PORT || 8000);
