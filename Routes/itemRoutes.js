const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItemData = {
    title: 'Autum best shoes',
    price: 299.99,
    image: 'foot_autum_01_',
    color: 'green',
    size: 'normal',
    quantity: 3,
    images: [1, 2, 3, 4],
    sku: 'autum_01',
    category: '60e593bbbf4b829b3784a7b1',
  };
  const newItem = new ShopItem(newItemData);

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
