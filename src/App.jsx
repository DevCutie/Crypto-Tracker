import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CoinDetail from './pages/CoinDetail';
import Home from './pages/Home';
const App = () => {
  return (
    <BrowserRouter basename="/Crypto-Tracker">
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/coin/:id'  element={<CoinDetail />}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App