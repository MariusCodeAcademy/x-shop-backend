const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);
  res.json('You are about to add item');
});

// gauti visus items

// gauti single item

module.exports = router;
