import React from 'react'
import Navbar from "./components/Navbar"
import ProductArea from './components/ProductArea'
import Banner from './components/Banner'
import Slider from './components/Slider'
const App = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Banner />
      <ProductArea />
    </>
  );
}

export default App