const express = require('express');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// sukurti nauja item
router.post('/api/shop/items/new', (req, res) => {
  console.log(req.body);

  const newItemData = {
    title: 'Green hat',
    price: 99.99,
    salePrice: 49.9,
    image: 'acc_hat_01_',
    color: 'green',
    sizeQty: [
      { size: 'small', quantity: 10 },
      { size: 'medium', quantity: 7 },
      { size: 'large', quantity: 15 },
    ],
    images: [1, 2, 3, 4, 5],
    sku: 'hat_01',
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
