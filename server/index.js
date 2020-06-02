const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const listener = console.log(`listening in on ${PORT}`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

//Routes
app.get('/api', (req, res) => res.send("yo!"));

app.use((req, res, next) => {
  res.status(404).json({ error: { message: '404 not found' } })
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err })
});

app.listen(PORT, listener);