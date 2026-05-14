import React from 'react'
import { motion } from 'framer-motion'
import style from './style.module.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

const columnHover = {
  y: -8,
  transition: { duration: 0.15 },
}

export default function Footer() {
  return (
    <motion.footer
      className={style.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <motion.div
        className={style.footerContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Quick Links */}
        <motion.div
          className={`${style.footerColumn} ${style.links}`}
          variants={itemVariants}
          whileHover={columnHover}
        >
          <h3>Quick Links</h3>
          <motion.ul variants={containerVariants}>
            {[
              'New Releases',
              'Best Sellers',
              "Men's Shoes",
              "Women's Clothing",
              "Kids' Gear",
            ].map(item => (
              <motion.li key={item} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Help */}
        <motion.div
          className={`${style.footerColumn} ${style.help}`}
          variants={itemVariants}
          whileHover={columnHover}
        >
          <h3>Help & Support</h3>
          <motion.ul variants={containerVariants}>
            {[
              'Order Status',
              'Shipping & Delivery',
              'Returns & Exchanges',
              'Payment Options',
              'Contact Us',
            ].map(item => (
              <motion.li key={item} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Company */}
        <motion.div
          className={`${style.footerColumn} ${style.company}`}
          variants={itemVariants}
          whileHover={columnHover}
        >
          <h3>Company</h3>
          <motion.ul variants={containerVariants}>
            {[
              'About Nike',
              'Careers',
              'News',
              'Investors',
              'Sustainability',
            ].map(item => (
              <motion.li key={item} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className={`${style.footerColumn} ${style.signup}`}
          variants={itemVariants}
          whileHover={columnHover}
        >
          <h3>Stay Connected</h3>
          <motion.p variants={itemVariants}>
            Sign up for exclusive offers and updates.
          </motion.p>

          <motion.form className={style.inputemail} variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <motion.input
              type="email"
              placeholder="Enter your email"
              required
              aria-label="Email address"
              whileFocus={{ borderColor: '#fff' }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className={style.footerBottom}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p>&copy; 2025 Nike, Inc. All Rights Reserved.</p>

        <div className={style.legalLinks}>
          {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(link => (
            <motion.span
              key={link}
              whileHover={{ scale: 1.1, color: '#fff' }}
              transition={{ duration: 0.25 }}
            >
              {link}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  )
}
