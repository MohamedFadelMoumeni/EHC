import { useState } from 'react';
import PHeader from './components/Header';
import PServiceTabs from './components/ServiceTabs';
import PServiceList from './components/ServiceList';
import PCart from './components/Cart';
import PPromoCode from './components/PromoCode';
import PPaymentSection from './components/PaymentSection';
import PFooter from './components/Footer';

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('CONSULTING');
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (service) => {
    setCartItems([...cartItems, service]);
  };

  const removeFromCart = (serviceId) => {
    setCartItems(cartItems.filter(item => item.id !== serviceId));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 - discount);
  };

  const applyPromoCode = (discountPercent) => {
    setDiscount(discountPercent);
  };

  return (
    <div className="min-h-screen bg-gray-50 ehc ehc_payment">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PHeader />
        
        <main className="mt-8">
          <PServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PServiceList category={activeTab} addToCart={addToCart} />
            </div>
            <div className="lg:col-span-1">
              <PCart
                items={cartItems}
                removeFromCart={removeFromCart}
                total={calculateTotal()}
              />
              <PPromoCode onApply={applyPromoCode} />
              <PPaymentSection />
            </div>
          </div>
        </main>
        
        <PFooter />
      </div>
    </div>
  );
}

export default PaymentPage;