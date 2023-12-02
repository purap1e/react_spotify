import playlistSongsData from '../data/Songs'
import Header from "../header/Header";
import React, {useEffect, useState} from "react";
import playlists from "../data/Playlists";
import './DetailsStyle.css'

import {MdOutlinePlayCircleFilled} from "react-icons/md";
import {BiDotsHorizontalRounded} from "react-icons/bi";
import {IoList} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";


const Details = ({ playlistId }) => {

    const [thisPlaylistSongs, setThisPlaylistSongs] = useState([]);
    const [thisPlaylist, setThisPlaylist] = useState({});
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        const filteredSongs = playlistSongsData.filter(song => song.playlistId === playlistId);
        setThisPlaylistSongs(filteredSongs);

        console.log(thisPlaylistSongs);

        const playlist = playlists.find(p => p.id === playlistId);
        setThisPlaylist(playlist);

    }, [playlistId]);

    useEffect(() => {
        const loadAudioDuration = async (audioSrc) => {
            const audio = new Audio(audioSrc);
            return new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', () => {
                    resolve(audio.duration);
                });
                audio.addEventListener('error', reject);
                audio.load();
            });
        };

        const updateTableRows = async () => {
            const rows = await Promise.all(
                thisPlaylistSongs.map(async (song, index) => {
                    try {
                        const duration = await loadAudioDuration(song.audioSrc);
                        return (
                            <tr key={index}>
                                <td>{song.id}</td>
                                <td>
                                    <div className="img-name">
                                        <img src={song.imgSrc} alt={''} />
                                        <p>{song.name}</p>
                                    </div>
                                </td>
                                <td>{song.album}</td>
                                <td>{song.updatedTime}</td>
                                <td>{formatDuration(duration)}</td>
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
        updateTableRows();
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
                <div className="playlist-info">
                    <div className="playlist-img">
                        <img src={thisPlaylist.imgSrc} alt={''}/>
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
                              <span className="tooltiptext">{`Открыть контекстное меню: ${thisPlaylist.name}`}</span>
                              <BiDotsHorizontalRounded />
                          </div>
                      </div>
                      <div className="list">
                          <p>Список</p>
                          <IoList />
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
                                        <hr />
                                    </td>
                                </tr>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details