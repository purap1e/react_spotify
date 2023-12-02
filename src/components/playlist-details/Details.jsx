import playlistSongsData from '../data/Songs'
import Header from "../header/Header";
import React, {useEffect, useState} from "react";
import playlists from "../data/Playlists";
import './DetailsStyle.css'

const Details = ({ playlistId }) => {

    const [thisPlaylistSongs, setThisPlaylistSongs] = useState([]);
    const [thisPlaylist, setThisPlaylist] = useState({});

    useEffect(() => {
        const filteredSongs = playlistSongsData.filter(song => song.playlistId === playlistId);
        setThisPlaylistSongs(filteredSongs);

        console.log(thisPlaylistSongs);

        const playlist = playlists.find(p => p.id === playlistId);
        setThisPlaylist(playlist);
        console.log(playlist);
    }, [playlistId]);

    return (
        <div className="main-details">
            <div className="container">
                <Header/>
                <div className="playlist-info">
                    <div className="playlist-img">
                        <img src={thisPlaylist.imgSrc}/>
                    </div>
                    <div className="playlist-text-info">
                        <p className="title">Плейлист</p>
                        <p className="playlist-name">{thisPlaylist.name}</p>
                        <div className="stats">
                            <img className="stats-ava" src="/images/kitten.png" alt="kitten"/>
                            <p className="username">puraple</p>
                            <ul className="inline-list">
                                <li>{thisPlaylistSongs.length} треков</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details