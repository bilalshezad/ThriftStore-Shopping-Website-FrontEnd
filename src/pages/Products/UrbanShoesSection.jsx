import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import style from './SneakerSection.module.css'
import ProductCard from "../../components/cards2/ProductCard";
import SplitText from "../../components/h1/SplitText";
import { Link } from "react-router-dom";

export default function UrbanShoesSection() {
  const [UrbanShoes, setUrbanShoes] = useState([])
  const getdata = async ()=>{
    const response = await fetch(`https://thrift-store-shopping-website-backe.vercel.app/products/geturbanshoes`)
    const data = await response.json()
    setUrbanShoes(data)
    console.log(UrbanShoes)
  }
  useEffect(function(){
    getdata()
  } , [])
    const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
  return (
    <>
    <div className="text-center pt-[80px] pb-[80px] bg-black">

      <SplitText
       text="Urban Shoes"
       className="text-5xl font-sans font-semibold text-white "
       delay={50}
       duration={1.25}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y:30 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  // textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
  showCallback
  />
  </div>
    <div className={style.cardsparent}>
      {UrbanShoes.map(function(elem , idx){
        return <div key={idx}>
          <ProductCard id={elem._id} h1={elem.h1} price={elem.price} subtitle={elem.subtitle} img={elem.img}/>
        </div>
      })}
    </div>
    <div className="flex justify-center pt-[60px] bg-black ">
      <Link to='/products/urbanshoes'>
      <button className={style.btn}>View All</button>
      </Link>
    </div>
    </>

      
  )
}
