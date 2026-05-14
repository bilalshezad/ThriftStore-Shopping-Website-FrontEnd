import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FilterBar.module.css'; // Ensure the path is correct

const FilterBar = ({gender , sizes, onfilterChange})=>{
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedSize, setSelectedSize] = useState(null);


  const handleGenderClick = (g)=>{
    setSelectedGender(g);
    onfilterChange(g , selectedSize)
  }
  const handleSize = (s)=>{
    setSelectedSize(s)
    onfilterChange(selectedGender ,s   )
  }
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={styles.wrapper}
    >
      <div>

      <div className={styles.container}>
        
        {/* Gender Section */}
        <div className={styles.genderSection}>
          {gender?.map((g)=>(
            <button
              key={g}
              onClick={() => handleGenderClick(g)}
              // Dynamic Class Assignment
              className={`${styles.genderBtn} ${
                selectedGender === g ? styles.genderBtnActive : ''
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Scrollable Size Section */}
        <div className={styles.sizeSection}>
          <span className={styles.label}>CHOOSE SIZE:</span>
          <div className={styles.scrollContainer}>
            {sizes.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSize(s)}
                // Dynamic Class Assignment
                className={`${styles.sizeBtn} ${
                  selectedSize === s ? styles.sizeBtnActive : ''
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

      </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;