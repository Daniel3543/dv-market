import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Loader from './components/UI/Loader';
import ProtectedRoute from './components/UI/ProtectedRoute';
import Admin from './pages/Admin';
import AuthSuccess from './pages/AuthSuccess';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Contact from './pages/Contact';


// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="auth" element={<Auth />} />
        </Route>
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </Suspense>
  );
}

export default App;