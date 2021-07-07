require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ShopCategory = require('./models/shopCategory');

const app = express();

const PORT = 4000;

// prisijungimas prie duomenu bazes
mongoose
  .connect(process.env.MONGO_CONNECT_STIRNG, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Conneced to Mongo ooooooooose');
  })
  .catch((err) => console.error(err.message));

// MIddleware
app.use(morgan('dev'));
// leidzia req body gauti kaip json
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json(`Serveris veikia an port ${PORT}`);
});

app.post('/api/shop/categories/new', (req, res) => {
  // gauti is userio title
  console.log(req.body);
  const titleFromUser = req.body.title;
  if (!titleFromUser) return res.status(400).json('no title');
  // su gautu title sukurti nauja categorijja
  const newCat = new ShopCategory({ title: titleFromUser });

  newCat
    .save()
    .then((result) => res.json(['category created', result]))
    .catch((err) => res.status(500).json('internal error'));
});

app.listen(PORT, console.log(`Back end online on port ${PORT}`));
