import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/cards/Card'
import style from './home.module.css'
import Reviews from '../../components/ReviewsCards/Reviews'
import Footer from '../../components/footer/footer';
function Home() {
  const homeSlides = [
  {
    id: 1,
    image: 'http://localhost:5173/src/assets/banner2.png',
    title: 'Air Jordan 1',
    description: 'Iconic sneaker for collectors'
  },
  {
    id: 2,
    image: 'http://localhost:5173/src/assets/banner1.png',
    title: 'Premium Collection',
    description: 'High-quality vintage shoes'
  },
  {
    id: 3,
    image: 'http://localhost:5173/src/assets/banner3.png',
    title: 'Rare Finds',
    description: 'Limited edition thrift store items'
  },
]
  return (
    <>
    <div>
      <Carousel slides={homeSlides}/>
    </div>
    <h1 className={style.categories}>Shop By Categories</h1>
    <div>
      <Card/>
    </div>
    <div>
      <Reviews/>
    </div>
    
    </>
  )
}

export default Home
