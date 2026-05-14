import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/useCart';
import { useToast } from '../context/useToast';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { showToast } = useToast();
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNowClick = () => {
    if (cartItems.length === 0) {
      showToast('Add something to cart first.', 'error');
      return;
    }
    setIsBuyNowOpen(true);
  };

  const handleCancelBuyNow = () => {
    setIsBuyNowOpen(false);
  };

  const handleBuyNowSubmit = async (e) => {
    e.preventDefault();
    const isEmptyField = Object.values(buyerInfo).some((value) => !value.trim());
    if (isEmptyField) {
      showToast('Please complete all address fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const products = cartItems.map((item) => ({
        productId: item.id,
        title: item.h1,
        price: item.price,
        image: item.img?.[0] || '',
        category: item.category,
        size: item.selectedSize || null,
        quantity: item.quantity,
      }));

      const res = await fetch('https://thrift-store-shopping-website-backe.vercel.app/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, customer: buyerInfo }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to place order.');
      }

      showToast('Order placed successfully!', 'success');
      clearCart();
      setIsBuyNowOpen(false);
      setIsCartOpen(false);
      setBuyerInfo({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    } catch (error) {
      console.error(error);
      showToast(error.message || 'Could not place order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <Motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-black">Shopping Cart</h2>
                <p className="text-sm text-gray-500">{cartItems.length} item(s)</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} color="black" />
              </button>
            </div>

            {/* Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                </div>
              ) : (
                <Motion.div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <Motion.div
                        key={item.uniqueId}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-200"
                      >
                        <div className="w-20 h-20 bg-gray-200 rounded-3xl overflow-hidden shrink-0">
                          <img
                            src={item.img?.[0] || 'https://via.placeholder.com/80'}
                            alt={item.h1}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-black text-sm line-clamp-2">{item.h1}</h3>
                          <p className="text-gray-600 text-sm mt-1">Rs {item.price}</p>
                          {item.selectedSize && <p className="text-gray-600 text-sm mt-1">Size: {item.selectedSize}</p>}
                          <p className="text-gray-600 text-sm mt-1">Total: Rs {item.price * item.quantity}</p>

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                              className="h-10 w-10 rounded-2xl border border-gray-300 bg-white text-black transition hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-2 bg-white rounded-2xl border border-gray-300 text-black font-semibold min-w-11 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                              className="h-10 w-10 rounded-2xl border border-gray-300 bg-white text-black transition hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="p-2 hover:bg-red-100 rounded-2xl transition self-start"
                        >
                          <Trash2 size={18} color="red" />
                        </button>
                      </Motion.div>
                    ))}
                  </AnimatePresence>
                </Motion.div>
              )}

              {isBuyNowOpen && cartItems.length > 0 && (
                <div className="space-y-6 bg-slate-950/90 border border-gray-800 p-5 rounded-3xl">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">Checkout Details</h3>
                    <p className="text-sm text-gray-400">Fill address details and place your order for all cart items.</p>
                  </div>

                  <form onSubmit={handleBuyNowSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={buyerInfo.name}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={buyerInfo.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={buyerInfo.phone}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">City</label>
                        <input
                          type="text"
                          name="city"
                          value={buyerInfo.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">Address</label>
                      <textarea
                        name="address"
                        value={buyerInfo.address}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Full delivery address"
                        className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">ZIP / Postal Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={buyerInfo.zip}
                          onChange={handleInputChange}
                          placeholder="Postal Code"
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-300">Order Total</label>
                        <div className="rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white">Rs {getTotalPrice().toFixed(2)}</div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition disabled:opacity-60"
                    >
                      {isSubmitting ? 'Placing order...' : `Place order Rs ${getTotalPrice().toFixed(2)}`}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Footer with Total and Buy Now */}
            {cartItems.length > 0 && (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-gray-200 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-black">Total:</span>
                  <span className="text-2xl font-bold text-black">Rs {getTotalPrice().toFixed(2)}</span>
                </div>

                {!isBuyNowOpen ? (
                  <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNowClick}
                    className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-900 transition"
                  >
                    Buy Now
                  </Motion.button>
                ) : (
                  <button
                    onClick={handleCancelBuyNow}
                    className="w-full rounded-full border border-gray-300 py-3 text-black font-semibold hover:bg-gray-100 transition"
                  >
                    Back to cart
                  </button>
                )}
              </Motion.div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
