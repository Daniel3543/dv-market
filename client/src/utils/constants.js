export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const categories = [
  { id: 'all', name: 'All Products', icon: '🍎' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'exotic', name: 'Exotic', icon: '🥑' },
  { id: 'organic', name: 'Organic', icon: '🌱' },
];

export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '💰' },
];