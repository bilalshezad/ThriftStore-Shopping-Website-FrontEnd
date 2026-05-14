import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'
import style from './SneakerSection.module.css'
import ProductCard from "../../components/cards2/ProductCard";
import SplitText from "../../components/h1/SplitText";
import { Link } from "react-router-dom";

export default function SneakersSection() {
  const [sneakersCard, setsneakersCard] = useState([])
  const getdata = async ()=>{
    const response = await fetch(`http://localhost:5000/products/getsneakers`)
    const data = await response.json()
    setsneakersCard(data)
    console.log(sneakersCard)
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
       text="Sneakers"
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
      {sneakersCard.map(function(elem , idx){
        return <div key={idx}>
          <ProductCard id={elem._id} h1={elem.h1} price={elem.price} subtitle={elem.subtitle} img={elem.img}/>
        </div>
      })}
    </div>
    <div className="flex justify-center pt-[60px] bg-black ">
      <Link to='/products/sneakers'>
      <button className={style.btn}>View All</button>
      </Link>
    </div>
    </>

      
  )
}
