import React from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../../components/carousel/Carousel'
import style from './Products.module.css'
import ProductCard from '../../components/cards2/ProductCard'
import SneakersSection from './SneakersSection'
import JogersSection from './JogersSection'
import ConverseSection from './ConverseSection'
import SlidesSection from './SlidesSection'
import UrbanShoesSection from './UrbanShoesSection'
export default function Products() {
  const productslider = [
    {
    id: 1,
    image: '/src/assets/banner4.png',
    },

    {
    id: 2,
    image: '/src/assets/banner5.png',
    }
  ]
 
  return (
    <>
    <Carousel slides={productslider}/>
    <div>
    <SneakersSection/>
    </div>
    <div>
      <JogersSection/>
    </div>
    <div>
      <ConverseSection/>
    </div>
    <div>
      <SlidesSection/>
    </div>
    <div>
      <UrbanShoesSection/>
    </div>
    </>
  )
}
