const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = 4000;

// MIddleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json(`Serveris veikia an port ${PORT}`);
});

app.listen(PORT, console.log(`Back end online on port ${PORT}`));
