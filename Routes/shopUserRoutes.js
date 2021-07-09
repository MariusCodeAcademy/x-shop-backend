const express = require('express');
const ShopUser = require('../models/shopUser');
const router = express.Router();

router.get('/api/shop/shopusers/', (req, res) => {
  res.json('there should be all users here');
});

// sukurti useri
router.post('/api/shop/shopusers/new', async (req, res) => {
  const newUserData = {
    name: 'Bob Stoned',
    email: 'Bob@Stoned.com',
    password: 'secret123',
  };

  const newUser = new ShopUser(req.body);
  try {
    const result = await newUser.save();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
