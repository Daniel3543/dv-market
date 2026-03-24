const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['fruits', 'vegetables', 'exotic', 'organic']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  oldPrice: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  images: [{
    type: String,
    required: true
  }],
  unit: {
    type: String,
    default: 'kg'
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);