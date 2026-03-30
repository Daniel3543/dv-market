import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../services/api';
import ProductCard3D from '../components/Product/ProductCard3D';
import ProductFilters from '../components/Product/ProductFilters';
import Skeleton from '../components/UI/Skeleton';
import { FiSearch } from 'react-icons/fi';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const { data, isLoading, error } = useQuery(
    ['products', filters],
    async () => {
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      
      const { data } = await api.get(`/products?${params.toString()}`);
      return data;
    }
  );

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.category !== 'all') newParams.set('category', filters.category);
    if (filters.search) newParams.set('search', filters.search);
    if (filters.sort !== 'newest') newParams.set('sort', filters.sort);
    if (filters.minPrice) newParams.set('minPrice', filters.minPrice);
    if (filters.maxPrice) newParams.set('maxPrice', filters.maxPrice);
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setFilters({ ...filters, search: formData.get('search') });
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                name="search"
                defaultValue={filters.search}
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-12 glass border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-md hover:bg-primary-700">
                Search
              </button>
            </div>
          </form>

          {/* Results Count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-400">
              {data?.total || 0} products found
            </p>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-3 py-1 glass border border-white/10 rounded-md"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">
              Error loading products. Please try again.
            </div>
          ) : data?.products?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.products?.map((product) => (
                <ProductCard3D key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;