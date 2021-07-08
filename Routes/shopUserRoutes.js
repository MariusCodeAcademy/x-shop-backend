const express = require('express');
const ShopUser = require('../models/shopUser');
const router = express.Router();

router.get('/api/shop/shopusers/', (req, res) => {
  res.json('there should be all users here');
});

module.exports = router;
