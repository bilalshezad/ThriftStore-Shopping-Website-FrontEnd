import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';

export default function ProductCard(props) {
  const [index, setIndex] = useState(0);
  const images = props.img;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if(!images || images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <motion.div 
      className="group cursor-pointer w-[300px] mx-4 mb-8"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 900 }}
      onClick={() => navigate(`/products/${props.id}`)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images ? images[index] : ""}
            alt={props.h1}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Dots */}
        {images && images.length > 1 && (
          <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === index ? "bg-black w-4" : "bg-black/40"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
              ></span>
            ))}
          </div>
        )}

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ 
              id: props.id, 
              name: props.h1, 
              price: props.price, 
              image: images ? images[0] : "" 
            });
            showToast('Item added to cart!', 'success');
          }}
          className="absolute bottom-0 left-0 right-0 bg-white text-black py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 font-bold z-20"
        >
          <ShoppingBag size={18} /> Add to Cart
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="flex justify-between items-start text-white">
        <div>
          <h3 className="text-lg font-bold group-hover:underline underline-offset-4">{props.h1}</h3>
          {props.subtitle && <h5 className="text-sm text-gray-400 mt-1 line-clamp-1">{props.subtitle}</h5>}
          <div className="flex items-center text-gray-400 mt-2">
            <Star size={14} className="fill-white text-white" />
            <Star size={14} className="fill-white text-white" />
            <Star size={14} className="fill-white text-white" />
            <Star size={14} className="fill-white text-white" />
            <Star size={14} className="fill-white text-white" />
            <span className="ml-2 text-xs">(42)</span>
          </div>
        </div>
        <p className="text-xl font-medium whitespace-nowrap ml-2">Rs {props.price}</p>
      </div>
    </motion.div>
  );
}
