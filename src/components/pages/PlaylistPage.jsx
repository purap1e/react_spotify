import SideBar from "../sidebar/SideBar";
import React from "react";
import Details from "../playlist-details/Details";
import {useParams} from "react-router-dom";
import './MainPageStyle.css'

const PlaylistPage = () => {
    const {playlistId} = useParams()

    return (
        <div className="wrapper">
            <SideBar/>
            <Details playlistId={playlistId}/>
        </div>
    );
}

export default PlaylistPage