import React, { useEffect, useState } from 'react'
import SplitText from "../../components/h1/SplitText";
import style from "./SneakerSection.module.css"
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards2/ProductCard';
export default function SlidesSection() {
  const [slides, setSlides] = useState([]);
  const getdata = async ()=>{
    const response = await fetch('http://localhost:5000/products/getslides') 
    const data =await response.json()
    setSlides(data)
    console.log(slides)
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
       text="Slides"
       className="text-5xl pb-2 font-sans font-semibold text-white "
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
        {slides.map(function(elem , idx){
          return <div key={idx}>
            <ProductCard id={elem._id} h1={elem.h1} price={elem.price} subtitle={elem.subtitle} img={elem.img}/>
          </div>
        })}
      </div>
      <div className="flex justify-center pt-[60px] bg-black ">
        <Link to='/products/slides'>
        <button className={style.btn}>View All</button>
        </Link>
      </div>
    </>
  )
}
