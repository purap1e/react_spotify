import Header from "../header/Header";
import React, {useCallback, useEffect, useState} from "react";
import './DetailsStyle.css'
import {useTrackContext} from '../TrackContext';

import {MdOutlinePlayCircleFilled} from "react-icons/md";
import {BiDotsHorizontalRounded} from "react-icons/bi";
import {IoList} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";
import axios from "axios";


const Details = ({playlistId}) => {

    const [thisPlaylistSongs, setThisPlaylistSongs] = useState([]);
    const [thisPlaylist, setThisPlaylist] = useState({});
    const [tableRows, setTableRows] = useState([]);
    const {currentTrack, setTrack} = useTrackContext();

    useEffect(() => {
        console.log("Fetching data...");
        axios.get(`http://localhost:8080/api/v1/playlists/${playlistId}`)
            .then(response => {
                setThisPlaylist(response.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });

        axios.get(`http://localhost:8080/api/v1/playlists/${playlistId}/songs`)
            .then(response => {
                setThisPlaylistSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    }, []);

    const AudioDuration = ({ audioSrc }) => {
        const [duration, setDuration] = useState(null);

        useEffect(() => {
            const audio = new Audio(audioSrc);

            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }, [audioSrc]);

        const formatDuration = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        };

        return <span>{duration ? formatDuration(duration) : 'Loading...'}</span>;
    };



    useEffect(() => {
        const updateTableRows = async () => {

            const rows = await Promise.all(
                thisPlaylistSongs.map(async (song, index) => {
                    try {
                        const updatedTimeDate = new Date(song.updatedTime);
                        const formattedUpdatedTime = updatedTimeDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        return (
                            <tr key={index} onClick={() => setTrack(song)}>
                                <td className="song-text">{index + 1}</td>
                                <td>
                                    <div className="img-name">
                                        <img src={song.image} alt={''}/>
                                        <div>
                                            <p>{song.name}</p>
                                            <p className="song-text">{song.artist}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="song-text">{song.album}</td>
                                <td className="song-text">{formattedUpdatedTime}</td>
                                <td className="song-text">
                                    <AudioDuration audioSrc={song.audio} />
                                </td>
                            </tr>
                        );
                    } catch (error) {
                        console.error('Error loading audio duration', error);
                        return null;
                    }
                })
            );
            setTableRows(rows.filter(row => row !== null));
        };
        updateTableRows().then();
    }, [thisPlaylistSongs]);

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    return (
        <div className="main-details">
            <div className="container">
                <Header/>
                {thisPlaylist ? (
                    <>
                        <div className="playlist-info">
                            <div className="playlist-img">
                                <img src={thisPlaylist.image} alt={''}/>
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
                        <div className="songs">
                            <div className="functions">
                                <div className="play-btn-and-settings">
                                    <div className="play-btn">
                                        <MdOutlinePlayCircleFilled/>
                                    </div>
                                    <div className="dots">
                                        <span
                                            className="tooltiptext">{`Открыть контекстное меню: ${thisPlaylist.name}`}</span>
                                        <BiDotsHorizontalRounded/>
                                    </div>
                                </div>
                                <div className="list">
                                    <p>Список</p>
                                    <IoList/>
                                </div>
                            </div>
                            <div className="song-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название</th>
                                        <th>Альбом</th>
                                        <th>Дата обновления</th>
                                        <th>
                                            <div className="sont-duration-icon">
                                                <IoMdTime/>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            <hr/>
                                        </td>
                                    </tr>
                                    {tableRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">
                            <div className="no-info">There is no info</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Details