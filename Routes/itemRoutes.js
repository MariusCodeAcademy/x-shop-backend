const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();
const newItemData = require('../models/stock');

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItem = new ShopItem(newItemData[1]);

  newItem
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// gauti visus items
router.get('/api/shop/items', async (req, res) => {
  try {
    const items = await ShopItem.find().populate('category');
    res.json(items);
  } catch (err) {
    res.status(500).json('internal error');
  }
});

// gauti single item
router.get('/api/shop/items/:id', async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.id).populate('category');
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
