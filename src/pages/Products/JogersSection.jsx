import React, { useEffect, useState } from 'react'
import SplitText from "../../components/h1/SplitText";
import style from "./SneakerSection.module.css"
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards2/ProductCard';
export default function JogersSection() {
  const [Jogers, setJogers] = useState([]);
  const getdata = async ()=>{
    const response = await fetch('https://thrift-store-shopping-website-backe.vercel.app/products/getjogers') 
    const data =await response.json()
    setJogers(data)
    console.log(Jogers)
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
       text="Jogers"
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
        {Jogers.map(function(elem , idx){
          return <div key={idx}>
            <ProductCard id={elem._id} h1={elem.h1} price={elem.price} subtitle={elem.subtitle} img={elem.img}/>
          </div>
        })}
      </div>
      <div className="flex justify-center pt-[60px] bg-black ">
        <Link to='/products/jogers'>
        <button className={style.btn}>View All</button>
        </Link>
      </div>
    </>
  )
}
