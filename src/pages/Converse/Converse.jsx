import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import style from '../Sneaker/SneakerSection.module.css'
import ProductCard from "../../components/cards2/ProductCard";
import SplitText from "../../components/h1/SplitText";
import { Link } from "react-router-dom";
import FilterBar from "../../components/FilterBar/FilterBar";

export default function Converse() {
  const [sneakersCard, setsneakersCard] = useState([])
  const [gender, setgender] = useState([])
  const [sizes, setsize] = useState([])
  
  const getgender = async()=>{
    const response = await fetch('http://localhost:5000/products/getgender')
    const data = await response.json();
    setgender(data)
    console.log(data)
  }
  const getdata = async (selectedGender = 'All' , selectedSize = null)=>{
    let query = `http://localhost:5000/products/getallconverse?Gender=${selectedGender}`;
    if(selectedSize){
      query += `&Size=${selectedSize}`
    }
    const response = await fetch(query)
    const data = await response.json()
    setsneakersCard(data)
  }
  const getsize = async()=>{
    const response = await fetch(`http://localhost:5000/products/getsize`)
    const data  = await response.json();
    setsize(data)
  }

  useEffect(function(){
    getgender()
    getsize()
    getdata()
  } , [])

    const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
  return (
    <>
      <div>
        <FilterBar gender={gender} sizes={sizes} onfilterChange={(g , s)=>getdata(g , s)}/>
      </div>
    <div className="text-center pt-[80px] pb-[80px] bg-black">

      <SplitText
       text="Converse"
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
  {sneakersCard.length === 0 ? (
    <h2 className="text-center text-2xl font-semibold text-white py-20">
      No products listed 😕 
    </h2>
  ) : (
    sneakersCard.map((elem, idx) => (
      <div key={idx}>
        <ProductCard
          id={elem._id}
          h1={elem.h1}
          price={elem.price}
          subtitle={elem.subtitle}
          img={elem.img}
        />
      </div>
    ))
  )}
</div>
    </>
  )
}
