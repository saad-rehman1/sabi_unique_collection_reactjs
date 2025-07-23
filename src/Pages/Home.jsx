import React from 'react'
import ImageSlider from '../Components/Slider';
import ShopeByCategory from '../Components/ShopeByCategory';
import LattestCollections from '../Components/LattestCollections';
import Layout from '../Layouts/Layout';
function Home() {
  return (
    <div>
        
             <ImageSlider/>
             <ShopeByCategory/>
             <LattestCollections/>
      
    </div>
  )
}

export default Home