import React from 'react'
import SideBar from "../sidebar/SideBar";
import Home from "../home/Home";
import './MainPageStyle.css'
import Footer from "../footer/Footer";

const MainPage = () => {
    return (
        <div className="wrapper">
            <SideBar/>
            <Home/>
        </div>
    );
}
export default MainPage