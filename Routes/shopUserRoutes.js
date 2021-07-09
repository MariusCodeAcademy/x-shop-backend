const express = require('express');
const ShopUser = require('../models/shopUser');
const router = express.Router();

router.get('/api/shop/shopusers/', async (req, res) => {
  try {
    const users = await ShopUser.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// sukurti useri
router.post('/api/shop/shopusers/new', async (req, res) => {
  const newUser = new ShopUser(req.body);
  try {
    const result = await newUser.save();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
