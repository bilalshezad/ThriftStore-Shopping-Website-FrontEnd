import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import style from './style.module.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Khan",
      rating: 5,
      text: "These vintage Nike shoes are absolutely stunning! The condition is perfect and they're so comfortable. Best purchase ever!",
      verified: true
    },
    {
      id: 2,
      name: "Fatima Ali",
      rating: 5,
      text: "Found the rarest Adidas collection here. Authentic, well-maintained, and delivered perfectly. Highly recommend!",
      verified: true
    },
    {
      id: 3,
      name: "Hassan Malik",
      rating: 4,
      text: "Great quality shoes at unbeatable prices. The classic Converse selection is amazing. Delivery was quick!",
      verified: true
    },
    {
      id: 4,
      name: "Ayesha Khan",
      rating: 5,
      text: "Sustainable fashion through thrift! Got premium branded shoes at a fraction of the price. Love this platform!",
      verified: true
    },
    {
      id: 5,
      name: "Muhammad Usman",
      rating: 5,
      text: "The shoe collection is incredible! Everything is authentic and the customer support is excellent. Will shop again!",
      verified: true
    },
    {
      id: 6,
      name: "Zainab Hassan",
      rating: 4,
      text: "Fantastic vintage sneaker collection. The photos are accurate and the shoes arrived in perfect condition. 5/5!",
      verified: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const hoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={style.reviewsSection}>
      <div className={style.container}>
        <motion.div 
          className={style.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={style.title}>Customer Reviews</h2>
          <p className={style.subtitle}>See what our happy customers have to say!</p>
        </motion.div>

        <motion.div 
          className={style.reviewsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className={style.reviewCard}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                variants={hoverVariants}
                className={style.cardInner}
              >
                {/* Star Rating */}
                <div className={style.ratingContainer}>
                  <div className={style.stars}>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star
                          size={18}
                          className={i < review.rating ? style.starFilled : style.starEmpty}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {review.verified && (
                    <span className={style.verified}>✓ Verified</span>
                  )}
                </div>

                {/* Review Text */}
                <p className={style.reviewText}>"{review.text}"</p>

                {/* User Info */}
                <div className={style.userInfo}>
                  <motion.div
                    className={style.avatarInitial}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </motion.div>
                  <div className={style.userDetails}>
                    <h4 className={style.userName}>{review.name}</h4>
                    <p className={style.userRole}>Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className={style.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={style.ctaText}>Join thousands of happy customers!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
