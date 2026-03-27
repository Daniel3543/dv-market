import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiPackage, FiUsers, FiShoppingCart, FiEdit2, FiTrash2 } from 'react-icons/fi';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'fruits',
    price: '',
    oldPrice: '',
    description: '',
    images: [''],
    unit: 'kg',
    stock: '',
    isOrganic: false,
    isFeatured: false
  });

  // Все хуки ДО условного возврата!
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const { data } = await api.get('/products');
        setProducts(data.products);
      } else if (activeTab === 'orders') {
        const { data } = await api.get('/admin/orders');
        setOrders(data.orders);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsers(data.users);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, productForm);
        toast.success('Product updated');
      } else {
        await api.post('/admin/products', productForm);
        toast.success('Product created');
      }
      fetchData();
      setEditingProduct(null);
      setProductForm({
        name: '', category: 'fruits', price: '', oldPrice: '',
        description: '', images: [''], unit: 'kg', stock: '',
        isOrganic: false, isFeatured: false
      });
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        toast.success('Product deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role });
      toast.success('User role updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleUpdateUserBalance = async (userId, amount) => {
    try {
      await api.put(`/admin/users/${userId}/balance`, { amount });
      toast.success('Balance updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        toast.success('User deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: FiPackage },
    { id: 'orders', label: 'Orders', icon: FiShoppingCart },
    { id: 'users', label: 'Users', icon: FiUsers }
  ];

  // Условный возврат после всех хуков
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-8 border-b">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="exotic">Exotic</option>
                <option value="organic">Organic</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price (AMD)"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Old Price"
                  value={productForm.oldPrice}
                  onChange={(e) => setProductForm({...productForm, oldPrice: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={productForm.images[0]}
                onChange={(e) => setProductForm({...productForm, images: [e.target.value]})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Stock"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
                <select
                  value={productForm.unit}
                  onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="kg">kg</option>
                  <option value="piece">piece</option>
                  <option value="bundle">bundle</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.isOrganic}
                    onChange={(e) => setProductForm({...productForm, isOrganic: e.target.checked})}
                    className="mr-2"
                  />
                  Organic
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({...productForm, isFeatured: e.target.checked})}
                    className="mr-2"
                  />
                  Featured
                </label>
              </div>
              <button type="submit" className="w-full btn-primary">
                {editingProduct ? 'Update' : 'Create'} Product
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '', category: 'fruits', price: '', oldPrice: '',
                      description: '', images: [''], unit: 'kg', stock: '',
                      isOrganic: false, isFeatured: false
                    });
                  }}
                  className="w-full btn-secondary"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {products.map(product => (
                  <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.price} AMD / {product.unit}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setProductForm({
                            name: product.name,
                            category: product.category,
                            price: product.price,
                            oldPrice: product.oldPrice || '',
                            description: product.description,
                            images: product.images || [''],
                            unit: product.unit,
                            stock: product.stock,
                            isOrganic: product.isOrganic,
                            isFeatured: product.isFeatured
                          });
                        }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-1 border rounded-lg text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{item.price * item.quantity} AMD</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{order.totalAmount} AMD</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Customer: {order.user?.name || order.user?.email}</p>
                    <p>Address: {order.shippingAddress?.street}, {order.shippingAddress?.city}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Balance (AMD)</th>
                    <th className="px-4 py-2 text-left">Referrals</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-t">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={u.balance}
                          onBlur={(e) => handleUpdateUserBalance(u._id, parseInt(e.target.value) - u.balance)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-3">{u.referralCount || 0}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;