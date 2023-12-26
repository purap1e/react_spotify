import React from 'react'
import SideBar from "../sidebar/SideBar";
import Search from "../search/Search";

const SearchPage = () => {
    return (
        <div className="wrapper">
            <SideBar/>
            <Search/>
        </div>
    );
}
export default SearchPage