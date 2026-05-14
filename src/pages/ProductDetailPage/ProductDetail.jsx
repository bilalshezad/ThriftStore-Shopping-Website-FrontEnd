import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { useToast } from "../../context/useToast";
import { motion as Motion } from 'framer-motion';

export default function ProductDetail() {
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setactiveImg] = useState(0); // image control
  const [selectedSize, setselectedSize] = useState(null);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const orderTotal = product ? quantity * product.price : 0;

  const validateSelection = () => {
    if (product?.Size?.length > 0 && !selectedSize) {
      showToast('Please select a size before continuing.', 'error');
      return false;
    }
    return true;
  };

  const openBuyNowModal = () => {
    if (!validateSelection()) return;
    setIsBuyNowOpen(true);
  };

  const closeBuyNowModal = () => {
    setIsBuyNowOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleBuyNowSubmit = async (e) => {
    e.preventDefault();

    if (!validateSelection()) return;

    const isEmptyField = Object.values(buyerInfo).some((value) => !value.trim());
    if (isEmptyField) {
      showToast('Please complete all address fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        products: [
          {
            productId: product._id,
            title: product.h1,
            price: product.price,
            image: product.img?.[0] || '',
            category: product.category,
            size: selectedSize || null,
            quantity,
          },
        ],
        customer: buyerInfo,
      };

      const res = await fetch('http://localhost:5000/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to place order.');
      }

      showToast('Order placed successfully!', 'success');
      setIsBuyNowOpen(false);
      setQuantity(1);
      setBuyerInfo({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    } catch (error) {
      console.error(error);
      showToast(error.message || 'Could not place order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        const rawProduct = data.product || data;
        
        // Normalize for both Shoes and Accessories
        const normalized = {
          ...rawProduct,
          h1: rawProduct.h1 || rawProduct.name,
          img: Array.isArray(rawProduct.img) ? rawProduct.img : (Array.isArray(rawProduct.image) ? rawProduct.image : [rawProduct.image || '']),
          description: rawProduct.description || "Premium quality item from our collection.",
          Gender: rawProduct.Gender || "Unisex"
        };
        
        setProduct(normalized);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product?.Size?.length > 0 && !selectedSize) {
      showToast('Please select a size before adding to cart.', 'error');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
    });
    showToast('Added to cart!', 'success');
    setIsCartOpen(true);
  };

  if(!product){
    return <h1 className="text-white pt-48 text-center">Loading...</h1>
  }
  return (
    <Motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#131313] text-white px-4 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest group"
        >
          <span className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-white transition-colors">
            ←
          </span>
          Back to collection
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">

        {/* LEFT IMAGES */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">

          <div className="aspect-square md:aspect-5/5 bg-[#1b1b1b] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={product.img[activeImg]}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt={product.h1}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {product.img.map((img , i)=>(
              <div 
              key={i} 
              onClick={()=>setactiveImg(i)}
              className={`aspect-square bg-[#1b1b1b] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImg === i ? 'border-white scale-95' : 'border-transparent hover:border-white/50'}`}>
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex flex-col justify-center">

          <div className="mb-6 md:mb-10">
            <div className="flex items-center gap-2 text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              <span>{product.category}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-white">{product.Gender}'s Collection</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-4">
              {product.h1}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              <p className="text-2xl md:text-3xl font-light tracking-tight">Rs {product.price}</p>
              {product.stock <= 0 && (
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                  Sold Out
                </span>
              )}
            </div>
          </div>


          {product?.Size && product.Size.length > 0 && (
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.15em] mb-3">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.Size.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setselectedSize(s)}
                    className={`w-14 h-12 rounded-full border ${
                      selectedSize === s
                      ? "bg-white text-black": "border-gray-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col gap-4">
            <Motion.button
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
              whileHover={product.stock > 0 ? { scale: 1.05, backgroundColor: '#374151' } : {}}
              whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
              className={`border py-4 rounded-full transition ${
                product.stock > 0 
                ? "border-gray-500 hover:bg-gray-800 bg-gray-900 text-white" 
                : "border-gray-800 bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Motion.button>
            <Motion.button
              disabled={product.stock <= 0}
              onClick={openBuyNowModal}
              whileHover={product.stock > 0 ? { scale: 1.05, backgroundColor: '#374151' } : {}}
              whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
              className={`border py-4 rounded-full transition ${
                product.stock > 0 
                ? "border-gray-500 hover:bg-gray-800 bg-gray-900 text-white" 
                : "border-gray-800 bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
            </Motion.button>
          </div>
          {isBuyNowOpen && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
            >
              <Motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-4xl border border-white/10 bg-linear-to-br from-[#111111] via-[#0b0b0b] to-[#181818] p-6 text-white shadow-2xl sm:p-8"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Buy Now</h2>
                    <p className="text-sm text-gray-400">Complete your address and confirm the order.</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBuyNowModal}
                    className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleBuyNowSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={buyerInfo.name}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none placeholder:text-gray-500 focus:border-white"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={buyerInfo.email}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none placeholder:text-gray-500 focus:border-white"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={buyerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none placeholder:text-gray-500 focus:border-white"
                        placeholder="03xx-xxxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">City</label>
                      <input
                        type="text"
                        name="city"
                        value={buyerInfo.city}
                        onChange={handleInputChange}
                        className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-4 text-white outline-none placeholder:text-gray-500 focus:border-white"
                        placeholder="City"
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
                      className="w-full rounded-xl border border-gray-700 bg-[#0f0f0f] p-3 text-white outline-none focus:border-white"
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={buyerInfo.zip}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-700 bg-[#0f0f0f] p-3 text-white outline-none focus:border-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-300">Quantity</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                          className="h-12 w-12 rounded-2xl border border-gray-700 bg-[#171717] text-lg text-white transition hover:bg-gray-800"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-full rounded-2xl border border-gray-700 bg-[#0f0f0f] p-3 text-white outline-none focus:border-white"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="h-12 w-12 rounded-2xl border border-gray-700 bg-[#171717] text-lg text-white transition hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <Motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-gray-700 bg-linear-to-br from-slate-900 via-[#111] to-slate-950 p-5 text-sm text-gray-300"
                  >
                    <p className="font-semibold text-white">Order summary</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300">Product: <span className="text-white">{product.h1}</span></p>
                      <p className="text-gray-300">Unit price: <span className="text-white">Rs {product.price}</span></p>
                      {selectedSize && <p className="text-gray-300">Size: <span className="text-white">{selectedSize}</span></p>}
                      <p className="text-gray-300">Quantity: <span className="text-white">{quantity}</span></p>
                      <p className="text-lg font-semibold text-white">Total: Rs {orderTotal}</p>
                    </div>
                    <p className="mt-4 text-gray-500">Your order details will be saved to backend with product, size, quantity and address.</p>
                  </Motion.div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-linear-to-r from-slate-800 via-gray-900 to-black px-5 py-4 text-white transition hover:from-slate-600 hover:to-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Placing order...' : `Place order Rs ${orderTotal}`}
                  </button>
                </form>
              </Motion.div>
            </Motion.div>
          )}

          {/* DESCRIPTION */}
          <div className="mt-12 text-gray-400 text-sm">
            <p className="text-gray-400 mt-2">
              {product.description}
            </p>
          </div>

        </div>

      </div>
      </div>
    </Motion.div>
  );
}