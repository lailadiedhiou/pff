import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MarketPage from './components/MarketPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import FarmerDashboard from './components/FarmerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import PaymentPage from './components/PaymentPage';
import EvaluationProduit from './components/EvaluationProduit';
import AdminDashboard from './components/AdminDashbord';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/market" element={<MarketPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
                <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/evaluation" element={<EvaluationProduit />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
