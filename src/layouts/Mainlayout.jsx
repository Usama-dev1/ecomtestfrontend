import React from 'react'
import Navbar from '../components/Navbar'
import Whatsapp from '../components/Whatsapp'
import { Outlet } from 'react-router-dom'
const Mainlayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
        <Whatsapp />
    </div>
  );
}

export default Mainlayout