import React from 'react'
import SideBar from "../sidebar/SideBar";
import Header from "../header/Header";

const SearchPage = () => {
    return (
        <div className="wrapper">
            <SideBar/>
            <Header showSearchInput={true}/>
        </div>
    );
}
export default SearchPage