import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Thrift Store" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </motion.div>

        <div className="z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 font-light"
          >
            Redefining vintage culture with a modern edge.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-full bg-white"
            />
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 bg-black z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">The Vision</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Founded on the principle that true style is timeless, we curate the most exceptional vintage sneakers, accessories, and apparel. We don't just sell products; we preserve history.
              </p>
              <p>
                Every piece in our collection has a story. By giving these items a second life, we are not only championing sustainable fashion but also allowing you to wear a piece of cultural heritage.
              </p>
            </div>
            <div className="mt-12">
              <div className="h-[1px] w-full bg-white/20 mb-8" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-bold mb-2">10k+</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold mb-2">5k+</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Vintage Items</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] w-full group"
          >
            <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Vintage Culture" 
              className="w-full h-full object-cover grayscale contrast-125"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-white" />
          </motion.div>
        </div>
      </div>
      
      {/* Banner Section */}
      <div className="border-y border-white/20 py-20 bg-white text-black overflow-hidden relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="whitespace-nowrap flex"
        >
          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mx-8">Stay Authentic • </h2>
          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mx-8 text-transparent" style={{ WebkitTextStroke: "2px black" }}>Wear History • </h2>
          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mx-8">Stay Authentic • </h2>
          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mx-8 text-transparent" style={{ WebkitTextStroke: "2px black" }}>Wear History • </h2>
        </motion.div>
      </div>

    </div>
  );
}
