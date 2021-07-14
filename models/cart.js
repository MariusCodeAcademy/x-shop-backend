const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// reikia apibrezti kokio tipo duomenys bus saugomi DB

// { title: string, body: string, .. }
const reqString = {
  type: String,
  required: true,
};
const reqNumber = {
  type: Number,
  required: true,
};

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shopUser',
      required: true,
    },
    cart: [
      {
        title: reqString,
        image: reqString,
        price: reqNumber,
        color: reqString,
        size: reqString,
        sku: reqString,
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'shopItem',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true } /// adds timestamps
);

// exportuoti naujai sukurta objekta pagal sia schema
//                           turetu buti vienaskai musu kolecijos pav.
const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
