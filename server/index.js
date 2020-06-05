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
app.use('/restaurants', require('./restaurants/restaurants.router'));

app.use((req, res, next) => {
  res.status(404).json({ error: { message: '404 not found' } })
});

app.use((err, req, res, next) => {
  console.log(err)
  const message = err.message;
  const details = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: { message, details } });
});

app.listen(PORT, listener);