import React from 'react'
import SideBar from "../sidebar/SideBar";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const SearchPage = () => {
    return (
        <div className="wrapper">
            <SideBar/>
            <Header showSearchInput={true}/>
            <Footer/>
        </div>
    );
}
export default SearchPage