import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const ProductFilters = ({ filters, setFilters }) => {
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'exotic', name: 'Exotic' },
    { id: 'organic', name: 'Organic' },
  ];

  const handleCategoryChange = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
    });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.minPrice || filters.maxPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FiFilter className="mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            <FiX className="mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="mr-3 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handlePriceChange}
              placeholder="$0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              placeholder="$100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;