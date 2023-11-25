import playlistSongsData from './Songs'
import Header from "../header/Header";
import React, {useEffect, useState} from "react";

const Details = ({ playlistId }) => {

    const [thisPlaylistSongs, setThisPlaylistSongs] = useState([]);

    useEffect(() => {
        const filteredSongs = playlistSongsData.filter(song => song.playlistId === playlistId);
        setThisPlaylistSongs(filteredSongs);
    }, [playlistId]);
    
    return (
        <div>
            <Header/>
            <div>Hello</div>
        </div>
    );
}

export default Details