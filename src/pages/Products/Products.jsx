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
import banner4 from "../../../assets/banner4.png";
import banner5 from "../../../assets/banner5.ong";
export default function Products() {
  const productslider = [
    {
    id: 1,
    image: banner4,
    },

    {
    id: 2,
    image: banner5,
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
