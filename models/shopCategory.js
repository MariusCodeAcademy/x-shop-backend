const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// reikia apibrezti kokio tipo duomenys bus saugomi DB

// { title: string, body: string, .. }

const shopCatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } /// adds timestamps
);

// exportuoti naujai sukurta objekta pagal sia schema
//                           turetu buti vienaskai musu kolecijos pav.
const ShopCategory = mongoose.model('shopCategory', shopCatSchema);

module.exports = ShopCategory;
