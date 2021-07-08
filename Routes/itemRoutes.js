const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItemData = {
    title: 'Stealth Bomber Jacket',
    price: 1599.95,
    image: 'acc_jacket_01_',
    color: 'navy',
    sizeQty: [
      { size: 'small', quantity: 5 },
      { size: 'medium', quantity: 5 },
      { size: 'large', quantity: 5 },
    ],
    images: [1, 2, 3],
    sku: 'jacket_01',
    category: '60e593cabf4b829b3784a7b5',
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
