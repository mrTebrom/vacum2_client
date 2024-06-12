'use client';
import './slider.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
 
import MySlider from 'react-slick';
import Image from 'next/image';
const Slider = () =>{
  const [slides, setSlides] = useState<{id: number, image: string}[]>([]);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      style: { width: '100%', height: 400, overflow: 'hidden',}
    };
    
    useEffect(() => {
      fetch('http://localhost:5000/api/slider', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(setSlides);
    }, []);
  
    return (
      <div className="d">
      <MySlider {...settings}>
        {slides.map(item => <div key={item.id} style={{height: 400}}>
          <Image 
            src={'/uploads/slider/'+item.image} 
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: '400px' }}
            alt="333"
            />
            
          </div>)}
      </MySlider>
    </div>
    );
}

export default Slider;