import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/lottieanimation.json';
import "../styles/header.css";

const AnimationComponent = () => {
  return <div className='header-page'>
    <div className='animation'>
    <Lottie animationData={animationData} loop={true} autoplay={true}  style={{ width: '150px', height: '100px', margin:'10px' }}
/>
    
  </div>
    <div>
       <p className='heading'> HOME-EASY</p>
    </div>
  </div>
  
  
};

export default AnimationComponent;
 