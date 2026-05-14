import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/cards/Card'
import style from './home.module.css'
import Reviews from '../../components/ReviewsCards/Reviews'
import Footer from '../../components/footer/footer';
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
function Home() {
  const homeSlides = [
  {
    id: 1,
    image: banner2,
    title: 'Air Jordan 1',
    description: 'Iconic sneaker for collectors'
  },
  {
    id: 2,
    image: banner1,
    title: 'Premium Collection',
    description: 'High-quality vintage shoes'
  },
  {
    id: 3,
    image: banner3,
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
