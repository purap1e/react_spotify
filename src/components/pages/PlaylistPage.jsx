import SideBar from "../sidebar/SideBar";
import React from "react";
import Details from "../playlist-details/Details";
import {useParams} from "react-router-dom";
import './MainPageStyle.css'
import Footer from "../footer/Footer";

const PlaylistPage = () => {
    const {playlistId} = useParams()

    return (
        <div className="wrapper">
            <SideBar/>
            <Details playlistId={playlistId}/>
            <Footer/>
        </div>
    );
}

export default PlaylistPage