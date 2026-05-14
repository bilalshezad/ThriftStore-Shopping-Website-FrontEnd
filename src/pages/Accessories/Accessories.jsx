 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Link, useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/getallaccessories'
      );

      const data = await response.json();

      console.log('Accessories Data:', data);

      setAccessories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch accessories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase">
            Accessories
          </h1>

          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Elevate your look with our curated collection of premium accessories.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {accessories.length > 0 ? (
            accessories.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => navigate(`/products/${item._id}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] mb-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">

                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Category */}
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm z-10">
                    {item.category}
                  </div>

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 translate-y-4 group-hover:translate-y-0">
                    {item.stock > 0 ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              ...item,
                              price: item.price,
                              image: Array.isArray(item.image) ? item.image[0] : item.image,
                              h1: item.name, // normalize for cart
                            });
                            showToast('Added to cart!', 'success');
                          }}
                          className="bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingBag size={14} />
                          Add to Cart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${item._id}`);
                          }}
                          className="bg-black text-white py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors border border-white/20"
                        >
                          Buy Now
                        </motion.button>
                      </>
                    ) : (
                      <div className="bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest cursor-not-allowed">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Out of Stock Ribbon */}
                  {item.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                      <span className="bg-white text-black px-6 py-2 font-black text-xs uppercase tracking-[0.3em] rotate-[-5deg] shadow-2xl">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-black tracking-tighter text-black">
                      ${item.price}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={10}
                        className="fill-black text-black"
                      />
                    ))}
                    <span className={`text-[10px] font-bold ml-1 uppercase tracking-widest ${item.stock > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-3 text-2xl font-bold">
              No Accessories Found
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

