import React, { useState, useEffect } from 'react'
import style from './Carousel.module.css'

export default function Carousel({ slides }) {   // 👈 yahan prop

  const [currentSlide, setCurrentSlide] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)

  // ❌ ye hard-coded slides hata do
  // const slides = [ ... ]

  useEffect(() => {
    if (!slides || slides.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [slides.length])

  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches?.[0]?.clientX || 0)
  }

  const handleDragEnd = (e) => {
    const end = e.clientX || e.changedTouches?.[0]?.clientX || 0
    setDragEnd(end)

    if (dragStart - end > 50) {
      goToNext()
    } else if (end - dragStart > 50) {
      goToPrevious()
    }
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className={style.container}>
      <div
        className={style.carousel}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className={style.slidesWrapper}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${style.slide} ${
                index === currentSlide ? style.active : ''
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={style.slideImage}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className={style.prevBtn}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className={style.nextBtn}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
    </div>
  )
}
