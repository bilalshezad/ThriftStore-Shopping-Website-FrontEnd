import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import style from "./card.module.css";
import sneakers from "../../../assets/sneakers.mp4";
import jogers from "../../../assets/jogers.mp4";
import urban1 from "../../../assets/urban1.mp4";
import converse from "../../../assets/converse.mp4";
import slides from "../../../assets/slides.mp4";

const ProductSlider = () => {
  const [index, setIndex] = useState(2);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);

  const products = [
    { video: sneakers, title: "Sneakers" },
    { video: jogers, title: "Jogers" },
    { video: urban1, title: "UrbanShoes" },
    { video: converse, title: "Converse" },
    { video: slides, title: "Slides" }
  ];

  const next = () =>
    setIndex((prev) => (prev + 1) % products.length);

  const prev = () =>
    setIndex((prev) => (prev - 1 + products.length) % products.length);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getOffset = () => {
    if (windowWidth < 480) return 260;
    if (windowWidth < 768) return 280;
    return 320;
  };

  return (
    <div className={style.container} ref={containerRef}>
      {products.map((item, i) => {
        const videoRef = useRef(null);

        const handleMouseEnter = () => {
          if (videoRef.current) videoRef.current.play();
        };

        const handleMouseLeave = () => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        };

        return (
          <motion.div
            key={i}
            className={style.cardWrapper}
            animate={{
              scale: i === index ? 1 : (windowWidth < 768 ? 0.7 : 0.8),
              opacity: i === index ? 1 : (windowWidth < 768 ? 0.3 : 0.4),
              x: (i - index) * getOffset(),
              zIndex: i === index ? 10 : 1,
            }}
            onClick={() => setIndex(i)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              src={item.video}
              className={style.video}
              muted
              loop
              playsInline
            />

            <div className={style.overlay}>
              <h2 className={style.title}>{item.title}</h2>
              <Link to={`/products/${item.title.toLowerCase()}`}>
                <button className={style.button}>View All</button>
              </Link>
            </div>
          </motion.div>
        );
      })}

      <div className={style.controls}>
        <button onClick={prev} className={style.controlButton}>
          Back
        </button>
        <button onClick={next} className={style.controlButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;

