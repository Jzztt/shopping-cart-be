import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    cost: Number,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      default: 0
    }
  }],
  total: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
