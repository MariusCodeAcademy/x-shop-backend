const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItemData = {
    title: 'Autum best',
    price: 299.99,
    image: 'foot_autum_01_',
    color: 'green',
    size: 'normal',
    sizeQty: [
      { size: 'small', quantity: 3 },
      { size: 'medium', quantity: 3 },
      { size: 'large', quantity: 3 },
    ],
    images: [1, 2, 3, 4],
    sku: 'autum_01',
    category: '60e593a6bf4b829b3784a7ad',
  };
  const newItem = new ShopItem(newItemData);

  newItem
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// gauti visus items

// gauti single item

module.exports = router;
