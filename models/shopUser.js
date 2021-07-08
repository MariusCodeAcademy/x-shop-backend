const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// reikia apibrezti kokio tipo duomenys bus saugomi DB

// { title: string, body: string, .. }
const reqStiring = {
  type: String,
  required: true,
};
const userSchema = new Schema(
  {
    title: reqStiring,
    email: reqStiring,
    password: reqStiring,
  },
  { timestamps: true } /// adds timestamps
);

// exportuoti naujai sukurta objekta pagal sia schema
//                           turetu buti vienaskai musu kolecijos pav.
const ShopUser = mongoose.model('shopUser', userSchema);

module.exports = ShopUser;
