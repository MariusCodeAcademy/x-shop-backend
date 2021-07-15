const express = require('express');
const Cart = require('../models/cart');
const ShopItem = require('../models/shopItem');
const router = express.Router();

// get count of carts of a user
router.get('/api/shop/cart/count/:userId', async (req, res) => {
  // gauti ta karta kurios userId yra lygus parametruose paduotam :userId
  try {
    const currentUserCartObj = await Cart.findOne({ userId: req.params.userId }).exec();
    // console.log(' currentUserCartObj', currentUserCartObj);
    if (currentUserCartObj && currentUserCartObj.cart) {
      // grazinti co masyvo ilgi
      return res.json(currentUserCartObj.cart.length);
    }
    res.status(200).json(0);
  } catch (err) {
    res.json(err);
  }
});

// get user cart
router.get('/api/shop/cart/:userId', async (req, res) => {
  console.log('get user cart function ran');
  // res.json(`You want to get cart of a user ${}`);
  try {
    // we find all carts of all users
    const allCarts = await Cart.find();
    console.log(allCarts);
    // find current user cart
    const currentUserCart = allCarts.find((u) => u.userId == req.params.userId);

    res.json(currentUserCart.cart);
  } catch (err) {
    res.json(err);
  }
});

// sukurti update cart quantity PUT route /api/shop/cart/:userId
router.put('/api/shop/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { cartItemId, newQty } = req.body;
  // susirasti carta pagal userId,
  const foundCartObj = await Cart.findOne({ userId: userId }).exec();
  console.log(' foundCartObj', foundCartObj.cart);

  // paieskoti tam carte item pagal cartId
  const foundCartItemToBeUpdated = foundCartObj.cart.find((cartItem) => cartItem._id == cartItemId);
  // higher level example
  // const foundCartItemToBeUpdated = cart.find(({ _id }) => _id == cartItemId);
  // atnaujinti kieki to item pagal newQty
  foundCartItemToBeUpdated.quantity = newQty;
  const saveResult = await foundCartObj.save();
  res.json({ msg: 'atnaujinimas in progress', saveResult });
});
// gauti atsakyma json pavidalu req.body arba isloginti req body

// add item to cart
router.post('/api/shop/cart/:userId', async (req, res) => {
  // console.log('add to cart route');
  // console.log(req.body);
  // console.log('we made cartItem');
  // console.log(shopItemToCartItem(req.body));

  // res.status(200).json();
  // return;

  try {
    // ar toks krepselis existuoja
    const currentCart = await Cart.findOne({ userId: req.params.userId }).exec();
    // console.log(' currentCart', currentCart);
    // jei krepselop siam vartotojui nera sukurta
    if (!currentCart) {
      // console.log('new cart');
      const newCart = await createNewCart(req.params.userId, req.body);
      res.json({ msg: 'created a cart', newCart: newCart });
    } else {
      // vartotojas jau turi kreplseli
      // arba padidinti kieki vienetu jei ta pati preke arba prideti nauja i krepseli
      const currentCartArr = currentCart.cart;
      increaseQtyOrAddNewItem(
        isItemVariantInCartAlready(currentCartArr, req.body),
        currentCartArr,
        req.body
      );
      await Cart.updateOne({ userId: req.params.userId }, { cart: currentCartArr });
      res.json({ msg: 'add item to cart', currentCart });
    }
  } catch (err) {
    res.json(err);
  }
});

//  helper fn

function shopItemToCartItem(shopItem) {
  /*
  shop item
  {
  images: [ 1, 2, 3 ],
  _id: '60ee82dc057db7c88f4ab4cb',
  title: 'Trench Biker Jeans',
  price: 111.99,
  image: 'denim_jeans_01_',
  color: 'blue',
  size: 'normal',
  quantity: 8,
  sku: 'jeans_01',
  category: 4545454
}
  cart item
  cart: [
      {
        title: reqString,
        image: reqString,
        price: reqNumber,
        color: reqString,
        size: reqString,
        sku: reqString,
        itemId: 45645645
        quantity: 1
        },
      },
    ],
  */
  const { title, image, price, salePrice, color, size, sku, _id: itemId } = shopItem;
  return {
    title,
    image,
    price: salePrice || price,
    color,
    size,
    sku,
    itemId,
  };
}

async function createNewCart(userId, body) {
  const newCart = new Cart({ userId: userId, cart: [shopItemToCartItem(body)] });
  await newCart.save();
  return newCart.cart;
}

function increaseQtyOrAddNewItem(didWeFoundThisItem, currentCartArr, body) {
  if (didWeFoundThisItem) {
    // qty ++
    console.log('++');
    didWeFoundThisItem.quantity++;
  } else {
    console.log('new item to cart');
    currentCartArr.push(shopItemToCartItem(body));
  }
}

function isItemVariantInCartAlready(currentCartArr, body) {
  return currentCartArr.find((ci) => ci.itemId == body._id);
}

module.exports = router;
