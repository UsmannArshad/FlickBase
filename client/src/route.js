import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from "./components/home";
import GoogleFontLoader from 'react-google-font-loader'
const Router=()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    <GoogleFontLoader
    fonts={[
    {font:'Roboto',weights:[300,400,900]},
    {font:'Fredoka One'}
    ]}
    />
    </BrowserRouter>
  )
}
export default Router;